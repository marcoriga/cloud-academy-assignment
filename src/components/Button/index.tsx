import { FC } from "react";
import styles from "./styles.module.css";

interface IButtonProps {
  loading?: boolean;
  onClick: () => void;
}

const Button: FC<IButtonProps> = (props) => {
  return (
    <button className={styles.Button} type="button" onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
