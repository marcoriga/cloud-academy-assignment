import { FC, useReducer, useRef, useState } from "react";

import Button from "../../components/Button";
import CharacterInformation from "../../components/CharacterInformation";
import CharacterThumb from "../../components/CharacterThumb";
import EpisodesList from "../../components/EpisodesList";
import ErrorWarning from "../../components/ErrorWarning";
import Location from "../../components/Location";
import Modal from "../../components/Modal";
import Spinner from "../../components/Spinner";

import styles from "./styles.module.css";
import { ICharacter } from "../../defs/types";
import httpClient from "../../client";

import reducer, { initialState } from "../../reducers/character";
import { CharacterActionType } from "../../reducers/actions";

interface ICharacterProps {
  data: ICharacter;
}

const Character: FC<ICharacterProps> = ({ data }) => {
  const [modalIsVisible, setModalIsVisible] = useState<boolean>(false);
  const [character, dispatch] = useReducer(reducer, initialState);
  const element = useRef<HTMLDivElement>(null);

  const showModal = () => {
    setModalIsVisible(true);

    // For every episode get the last part of the url (id) and cast as number
    const ids = data.episode.map((url) =>
      parseInt(url.split("/").slice(-1)[0])
    );

    // Fetching all the necessary data
    Promise.all([
      httpClient.getLocation(data.location.url),
      httpClient.getLocation(data.origin.url),
      httpClient.getEpisodes(ids),
    ])
      .then((values) =>
        dispatch({ type: CharacterActionType.Success, payload: values })
      )
      .catch(() => dispatch({ type: CharacterActionType.Error }));
  };

  const hideModal = () => {
    element.current?.focus();
    dispatch({ type: CharacterActionType.Reset });
    setModalIsVisible(false);
  };

  return (
    <div tabIndex={0} ref={element} className={styles.Character}>
      <div className={styles.Content}>
        <CharacterThumb src={data.image} alt={data.name} />

        <div className={styles.Body}>
          <CharacterInformation
            name={data.name}
            gender={data.gender}
            status={data.status}
            species={data.species}
          />

          <Button theme="link" onClick={showModal}>
            Show details
          </Button>

          {modalIsVisible && (
            <Modal title={data.name} onClose={hideModal}>
              {character.error && <ErrorWarning />}

              {character.loading && <Spinner />}

              {character.location && (
                <Location
                  title="Last know location"
                  location={character.location}
                />
              )}

              {character.origin && (
                <Location title="Origin" location={character.origin} />
              )}

              {character.episodes && (
                <EpisodesList episodes={character.episodes} />
              )}
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
};

export default Character;
