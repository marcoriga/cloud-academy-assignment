import { FC } from "react";
import styles from "./styles.module.css";

const Container: FC = ({ children }) => {
  return <div className={styles.Container}>{children}</div>;
};

export default Container;
