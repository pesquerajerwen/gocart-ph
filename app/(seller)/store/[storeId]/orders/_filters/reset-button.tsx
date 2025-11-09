"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useQueryState } from "nuqs";

export default function ResetButton() {
  const [, setSearch] = useQueryState("q");
  const [, setStatus] = useQueryState("status");
  const [, setPayment] = useQueryState("payment");
  const [, setProduct] = useQueryState("product");
  const [, setFrom] = useQueryState("from");
  const [, setTo] = useQueryState("to");

  function handleClick() {
    setSearch(null);
    setStatus(null);
    setPayment(null);
    setProduct(null);
    setFrom(null);
    setTo(null);
  }

  return (
    <Button variant={"ghost"} onClick={handleClick}>
      Reset <X />
    </Button>
  );
}
