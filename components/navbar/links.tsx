import { getStore } from "@/lib/dal/store";
import Link from "next/link";

type Props = {
  userId?: string;
};

export default async function NavLinks({ userId }: Props) {
  const store = userId ? await getStore({ userId }) : undefined;

  return (
    <div className="hidden sm:flex flex-row gap-6">
      <Link href={"/"}>Home</Link>
      <Link href={"/shop"}>Shop</Link>
      {store && (
        <Link
          href={`/store/${store?.id}`}
          className="border-b-2 border-green-600"
        >
          Seller
        </Link>
      )}
      <Link href={"/admin"} className="border-b-2 border-green-600">
        Admin
      </Link>
    </div>
  );
}
