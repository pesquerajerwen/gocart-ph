import { SidebarHeader } from "@/components/ui/sidebar";
import { getStore } from "@/lib/dal/store";
import Image from "next/image";
import { redirect } from "next/navigation";

type Props = {
  storeId: string;
};

export default async function StoreLogo({ storeId }: Props) {
  const store = await getStore({ storeId });

  if (!store) return redirect("/not-found");

  return (
    <SidebarHeader className="data-[state=collapsed]:hidden">
      <div className="flex flex-col justify-center items-center gap-3 my-4">
        <Image
          src={store.avatarUrl}
          alt="store_logo"
          className="shadow-md rounded-full border border-slate-100"
          width={70}
          height={70}
        />
        <p>{store.name}</p>
      </div>
    </SidebarHeader>
  );
}
