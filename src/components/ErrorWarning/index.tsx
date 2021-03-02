import { FC } from "react";
import styles from "./styles.module.css";

const ErrorWarning: FC = () => {
  return <p className={styles.Error}>Sorry, an error has occurred.</p>;
};

export default ErrorWarning;
