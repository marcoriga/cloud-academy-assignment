import { useCallback, useRef } from "react";
import { FC, useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./styles.module.css";

interface IModalProps {
  title: string;
  onClose: () => void;
}

const Modal: FC<IModalProps> = ({ title, onClose, children }) => {
  const body = useRef<HTMLDivElement>(null);

  const onKeyup = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    body.current?.focus();
    document.body.classList.add("is-modal-open");
    window.addEventListener("keyup", onKeyup);

    return () => {
      document.body.classList.remove("is-modal-open");
      window.removeEventListener("keyup", onKeyup);
    };
  }, [onKeyup]);

  const html = (
    <div className={styles.Modal}>
      <div className={styles.Backdrop} onClick={onClose}></div>

      <div className={styles.Content}>
        <div tabIndex={0} ref={body} className={styles.Inner}>
          <div className={styles.Header}>
            <h4>{title}</h4>

            <button onClick={onClose} className={styles.Dismiss}>
              x
            </button>
          </div>

          <div className={styles.Body}>{children}</div>
        </div>
      </div>
    </div>
  );

  return createPortal(html, document.body);
};

export default Modal;
