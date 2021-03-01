import { FC } from "react";
import styles from "./styles.module.css";

interface IPairedProps {
  label: string;
  value: string | number;
}

const Paired: FC<IPairedProps> = ({ label, value }) => {
  return (
    <div className={styles.Wrapper}>
      <label>{label}:</label>
      <span>{value}</span>
    </div>
  );
};

export default Paired;
