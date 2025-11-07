"use client";

import Pagination from "@/components/pagination";
import { useRouter } from "next/navigation";
import { parseAsInteger, useQueryState } from "nuqs";

type Props = {
  totalPage: number;
};

export default function StoreOrdersPagination({ totalPage }: Props) {
  const router = useRouter();

  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [size, setSize] = useQueryState("size", parseAsInteger.withDefault(5));

  async function onChangeRowsPerPage(value: string) {
    await Promise.all([setPage(1), setSize(Number(value))]);

    router.refresh();
  }

  async function onClickFirst() {
    await setPage(1);
    router.refresh();
  }

  async function onClickPrevious() {
    await setPage(page - 1);
    router.refresh();
  }

  async function onClickNext() {
    await setPage(page + 1);
    router.refresh();
  }

  async function onClickLast() {
    await setPage(totalPage);
    router.refresh();
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
