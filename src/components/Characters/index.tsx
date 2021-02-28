import { FC } from "react";
import styles from "./styles.module.css";

const Characters: FC = ({ children }) => {
  return <div className={styles.Wrapper}>{children}</div>;
};

export default Characters;
