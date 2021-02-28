import { FC } from "react";
import styles from "./styles.module.css";
import { ICharacter } from "../../defs/character";

interface ICharacterProps {
  data: ICharacter;
}

const Character: FC<ICharacterProps> = ({ data }) => {
  return (
    <div className={styles.Character}>
      <div className={styles.Content}>
        <div className={styles.Thumb}>
          <div className={styles.ThumbInner}>
            <img src={data.image} alt={data.name} loading="lazy" />
          </div>
        </div>

        <div className={styles.Body}>
          <h3>{data.name}</h3>
        </div>
      </div>
    </div>
  );
};

export default Character;
