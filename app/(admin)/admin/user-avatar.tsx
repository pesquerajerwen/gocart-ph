import { assets } from "@/assets/assets";
import { SidebarHeader } from "@/components/ui/sidebar";
import { getCurrentUser } from "@/lib/dal/user";
import { capitalize } from "lodash";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function UserAvatar() {
  const user = await getCurrentUser();

  if (!user) redirect("/");

  return (
    <SidebarHeader className="data-[state=collapsed]:hidden">
      <div className="flex flex-col justify-center items-center gap-3 my-4">
        <Image
          src={user.avatarUrl || assets.image_not_available}
          alt="user_avatar"
          className="shadow-md rounded-full border border-slate-100"
          width={64}
          height={64}
        />
        <p>
          {capitalize(user.firstName || "")} {capitalize(user.lastName || "")}
        </p>
      </div>
    </SidebarHeader>
  );
}
