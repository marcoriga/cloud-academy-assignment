import { FC } from "react";
import { Gender, Status } from "../../defs/types";
import styles from "./styles.module.css";

interface ICharacterInformationProps {
  name: string;
  gender: Gender;
  species: string;
  status: Status;
}

const CharacterInformation: FC<ICharacterInformationProps> = ({
  name,
  gender,
  species,
  status,
}) => {
  return (
    <div className={styles.Info}>
      <h3>{name}</h3>

      <div className={styles.Data}>
        {status !== "unknown" && <span>{status}</span>}
        {gender !== "unknown" && <span>{gender}</span>}
        <span>{species}</span>
      </div>
    </div>
  );
};

export default CharacterInformation;
