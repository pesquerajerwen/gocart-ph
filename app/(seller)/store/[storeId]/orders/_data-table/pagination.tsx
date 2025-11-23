"use client";

import Pagination from "@/components/table-pagination";
import { parseAsInteger, useQueryState } from "nuqs";

type Props = {
  totalPage: number;
};

export default function StoreOrdersPagination({ totalPage }: Props) {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [size, setSize] = useQueryState("size", parseAsInteger.withDefault(10));

  async function onChangeRowsPerPage(value: string) {
    await Promise.all([setPage(1), setSize(Number(value))]);
  }

  async function onClickFirst() {
    await setPage(1);
  }

  async function onClickPrevious() {
    await setPage(page - 1);
  }

  async function onClickNext() {
    await setPage(page + 1);
  }

  async function onClickLast() {
    await setPage(totalPage);
  }

  return (
    <Pagination
      page={page}
      totalPage={totalPage}
      rowsPerPage={size}
      onChangeRowsPerPage={onChangeRowsPerPage}
      onClickFirst={onClickFirst}
      onClickPrevious={onClickPrevious}
      onClickNext={onClickNext}
      onClickLast={onClickLast}
    />
  );
}
