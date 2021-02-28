import { FC } from "react";
import styles from "./styles.module.css";

interface IPageTitleProps {
  title: string;
}

const PageTitle: FC<IPageTitleProps> = ({ title }) => {
  return <h1 className={styles.PageTitle}>{title}</h1>;
};

export default PageTitle;
