import { FC } from "react";
import styles from "./styles.module.css";

interface IButtonProps {
  theme?: "default" | "link";
  onClick: () => void;
}

const Button: FC<IButtonProps> = ({ theme = "default", onClick, children }) => {
  const layoutClass = theme === "default" ? styles.Default : styles.Link;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${styles.Button} ${layoutClass}`}
    >
      {children}
    </button>
  );
};

export default Button;
