import { FC } from "react";
import { ILocation } from "../../defs/types";
import styles from "./styles.module.css";

interface ILocationProps {
  location: ILocation;
  title: string;
}

const Location: FC<ILocationProps> = ({ location, title }) => {
  return (
    <div className={styles.Wrapper}>
      <h5>{title}</h5>

      <div className={styles.Item}>
        <b>Name</b>: {location.name}
      </div>

      <div className={styles.Item}>
        <b>Type</b>: {location.type}
      </div>

      <div className={styles.Item}>
        <b>Dimension</b>: {location.dimension}
      </div>

      <div className={styles.Item}>
        <b>Residents</b>: {location.residents.length}
      </div>
    </div>
  );
};

export default Location;
