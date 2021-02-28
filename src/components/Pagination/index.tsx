import { FC } from "react";
import styles from "./styles.module.css";
import Button from "../Button";

interface IPaginationProps {
  pages: number;
  currentPage: number;
  onNavigation: (page: number) => void;
}

const Pagination: FC<IPaginationProps> = ({
  pages,
  currentPage,
  onNavigation,
}) => {
  return (
    <div className={styles.Pagination}>
      <div>
        {currentPage > 1 && (
          <Button onClick={() => onNavigation(currentPage - 1)}>
            Previous page
          </Button>
        )}
      </div>

      <div>
        {currentPage < pages && (
          <Button onClick={() => onNavigation(currentPage + 1)}>
            Next page
          </Button>
        )}
      </div>
    </div>
  );
};

export default Pagination;
