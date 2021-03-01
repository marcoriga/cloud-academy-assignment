import { FC } from "react";
import styles from "./styles.module.css";

interface ICharacterThumbProps {
  src: string;
  alt: string;
}

const CharacterThumb: FC<ICharacterThumbProps> = ({ src, alt }) => {
  return (
    <div className={styles.Thumb}>
      <div className={styles.ThumbInner}>
        <img src={src} alt={alt} loading="lazy" />
      </div>
    </div>
  );
};

export default CharacterThumb;
