"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition, memo } from "react";
import Spinner from "../Spinner";
import { updateSearchParams } from "../utils";

import styles from '../cars.module.css';
const { pagination } = styles;

interface Props {
  currentPage: number;
  totalPages: number;
  sort?: string;
}

const Pagination = ({ currentPage, totalPages, sort }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const goToPage = (page: number) => {
    const query = updateSearchParams(searchParams, {
        page: String(page),
        sort: sort || undefined,
    });

    startTransition(() => {
      router.push(`/cars?${query}`);
    });
  };

  return (
    <div className={pagination}>
      <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage <= 1}>
        Назад
      </button>
      <span style={{ margin: "0 1rem" }}>
        Страница {currentPage} из {totalPages}
      </span>
      <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage >= totalPages}>
        Вперёд
      </button>
      {isPending && <Spinner />}
    </div>
  );
}

export default memo(Pagination);