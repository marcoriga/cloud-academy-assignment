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
import { CharacterModalPromise, ICharacter } from "../../defs/types";
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
    // Setting loading status and modal visibility
    dispatch({ type: CharacterActionType.Load });
    setModalIsVisible(true);

    // List of necessary promises for data fetching
    const promises: CharacterModalPromise = [];

    // If character has a known location
    // Fetch location data and add to promises array
    if (data.location.url !== "") {
      const location = httpClient
        .getLocation(data.location.url)
        .then((res) => ({ location: res }));

      promises.push(location);
    }

    // If character has a known origin
    // Fetch location data and add to promises array
    if (data.origin.url !== "") {
      const origin = httpClient
        .getLocation(data.origin.url)
        .then((res) => ({ origin: res }));

      promises.push(origin);
    }

    if (data.episode.length) {
      // For every episode get the last part of the url (id) and cast as number
      const ids = data.episode.map((url) =>
        parseInt(url.split("/").slice(-1)[0])
      );

      const episodes = httpClient
        .getEpisodes(ids)
        .then((e) => ({ episodes: Array.isArray(e) ? e : [e] }));

      promises.push(episodes);
    }

    // Fetching all the necessary data
    Promise.all(promises)
      .then((values) => {
        // Merging all the data in a new object
        const payload = values.reduce(
          (obj: any, x: any) => ({ ...obj, ...x }),
          {}
        );

        dispatch({ type: CharacterActionType.Success, payload });
      })
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
