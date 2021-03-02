import { FC } from "react";
import styles from "./styles.module.css";
import { IEpisode } from "../../defs/types";

interface IEpisodesListProps {
  episodes: IEpisode[];
}

const Location: FC<IEpisodesListProps> = ({ episodes }) => {
  return (
    <div className={styles.Wrapper}>
      <h5>Episodes</h5>

      <div className={styles.Lists}>
        {episodes.map((e) => e.name).join(" - ")}
      </div>
    </div>
  );
};

export default Location;
