import { getStore } from "@/lib/dal/store";
import { getRole } from "@/lib/dal/user";
import Link from "next/link";

type Props = {
  userId?: string;
};

export default async function NavLinks({ userId }: Props) {
  const [store, role] = await Promise.all([
    userId ? getStore({ userId }) : Promise.resolve(undefined),
    userId ? getRole({ userId }) : Promise.resolve(undefined),
  ]);

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
      {role?.name === "admin" && (
        <Link href={"/admin"} className="border-b-2 border-green-600">
          Admin
        </Link>
      )}
    </div>
  );
}
