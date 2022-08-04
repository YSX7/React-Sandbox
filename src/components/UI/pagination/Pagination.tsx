import React from "react";
import { usePagination } from "@/hooks/usePagination";
import MyButton from "../button/MyButton";
import classes from "./pagination.module.css";

interface PaginationProps {
  totalPages: number;
  page: number;
  changePage: (page: number) => void;
}

function Pagination({ totalPages, page, changePage }: PaginationProps) {
  let pagesArray = usePagination(totalPages);
  return (
    <div className={classes.page__wrapper}>
      {pagesArray.map((p) => (
        <MyButton
          onClick={() => changePage(p)}
          key={p}
          className={page === p ? classes.page__current : undefined}
        >
          {p}
        </MyButton>
      ))}
    </div>
  );
}

export default Pagination;
