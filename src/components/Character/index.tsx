import { FC } from "react";
import Button from "../Button";
import CharacterThumb from "../CharacterThumb";
import Paired from "../Paired";
import styles from "./styles.module.css";
import { ICharacter } from "../../defs/types";
import CharacterInformation from "../CharacterInformation";

interface ICharacterProps {
  data: ICharacter;
  onShowEpisodes: (ids: number[]) => void;
}

const Character: FC<ICharacterProps> = ({ data, onShowEpisodes }) => {
  const showEpisodes = () => {
    // Retrieve the ID of each episode
    // The ID is the last parameter in the url
    const ids = data.episode.map((url) =>
      parseInt(url.split("/").slice(-1)[0])
    );

    onShowEpisodes(ids);
  };

  return (
    <div className={styles.Character}>
      <div className={styles.Content}>
        <CharacterThumb src={data.image} alt={data.name} />

        <div className={styles.Body}>
          <CharacterInformation
            name={data.name}
            gender={data.gender}
            status={data.status}
            species={data.species}
          />

          <Paired label="Last known location" value={data.location.name} />
          <Paired label="Origin location" value={data.origin.name} />

          {data.episode.length && (
            <Button theme="link" onClick={showEpisodes}>
              Show episodes
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Character;
