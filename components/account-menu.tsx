"use client";

import { assets } from "@/assets/assets";
import { User } from "@prisma/client";
import { LogOut, Package, PlusIcon, Settings } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { upperFirst } from "lodash";
import { createClient } from "@/utils/supabase-client";
import { useRouter } from "next/navigation";

type Props = {
  variant?: "buyer" | "seller" | "admin";
  user: User;
};

export default function AccountMenu({ variant = "buyer", user }: Props) {
  const supabase = createClient();
  const router = useRouter();

  const MenuItems = [
    {
      icon: Settings,
      label: "Manage Account",
      hidden: false,
      onClick: () => null,
    },
    {
      icon: Package,
      label: "My Orders",
      hidden: ["seller", "admin"].includes(variant),
      onClick: () => null,
    },
    {
      icon: LogOut,
      label: "Sign out",
      onClick: () => {
        supabase.auth.signOut();
        router.refresh();
      },
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Image
          src={user.avatarUrl || assets.user_icon}
          alt={"user_icon"}
          height={30}
          width={30}
          className="rounded-full cursor-pointer"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-64"
        side="bottom"
        align="end"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <DropdownMenuLabel>
          <div className="flex gap-3 p-3">
            <Image
              src={user.avatarUrl || assets.user_icon}
              alt={"user_icon"}
              height={35}
              width={35}
              className="rounded-full cursor-pointer"
            />
            <div>
              <p className="text-slate-800 text-sm">
                {upperFirst(user.firstName!)} {upperFirst(user.lastName!)}
              </p>
              <p className="text-slate-500 text-xs">{user.email}</p>
            </div>
          </div>
        </DropdownMenuLabel>
        {MenuItems.map((item, index) => {
          if (item.hidden) return null;

          return (
            <DropdownMenuItem
              key={index}
              className="cursor-pointer py-2"
              onClick={item.onClick}
            >
              <div
                key={index}
                className="text-slate-600 flex items-center gap-3"
              >
                <div className="w-[35px] flex justify-center">
                  <item.icon className="size-4" />
                </div>
                <span className="text-sm">{item.label}</span>
              </div>
            </DropdownMenuItem>
          );
        })}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer py-2">
          <div className="text-slate-600 flex items-center gap-3">
            <div className="w-[35px] flex justify-center">
              <div className="size-[25px] rounded-full flex items-center justify-center bg-slate-100 border border-dashed border-slate-300">
                <PlusIcon className="size-4" />
              </div>
            </div>
            <span className="text-sm">Add account</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
