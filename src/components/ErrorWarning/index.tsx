import { FC } from "react";
import styles from "./styles.module.css";

const ErrorWarning: FC = () => {
  return <p className={styles.Error}>Spiacenti si è verificato un errore.</p>;
};

export default ErrorWarning;
