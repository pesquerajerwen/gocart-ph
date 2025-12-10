"use client";

import ListPagination from "@/components/list-pagination";
import { useRouter } from "next/navigation";

type Props = {
  currentPage: number;
  totalPages: number;
};

export default function ProductPagination({ currentPage, totalPages }: Props) {
  const router = useRouter();

  return (
    <ListPagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={(page: number) => {
        router.push(`?page=${page}`);
      }}
    />
  );
}
