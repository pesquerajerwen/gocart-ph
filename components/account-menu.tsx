"use client";

import { assets } from "@/assets/assets";
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
import { User } from "@supabase/supabase-js";

const MenuItems = [
  {
    icon: Settings,
    label: "Manage Account",
  },
  {
    icon: Package,
    label: "My Orders",
  },
  {
    icon: LogOut,
    label: "Sign out",
  },
];

type Props = {
  user: User;
};

export default function AccountMenu({ user }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Image
          src={assets.user_icon}
          alt={"user_icon"}
          height={30}
          width={30}
          className="rounded-full cursor-pointer"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-80"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <DropdownMenuLabel>
          <div className="flex gap-3 p-3">
            <Image
              src={assets.user_icon}
              alt={"user_icon"}
              height={35}
              width={35}
              className="rounded-full cursor-pointer"
            />
            <div>
              <p className="text-slate-800 text-sm">John Doe</p>
              <p className="text-slate-500 text-xs">{user.email}</p>
            </div>
          </div>
        </DropdownMenuLabel>
        {MenuItems.map((item) => (
          <DropdownMenuItem className="cursor-pointer py-2">
            <p className="text-slate-600 flex items-center gap-3">
              <div className="w-[35px] flex justify-center">
                <item.icon className="size-4" />
              </div>
              <span className="text-sm">{item.label}</span>
            </p>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer py-2">
          <p className="text-slate-600 flex items-center gap-3">
            <div className="w-[35px] flex justify-center">
              <div className="size-[25px] rounded-full flex items-center justify-center bg-slate-100 border border-dashed border-slate-300">
                <PlusIcon className="size-4" />
              </div>
            </div>
            <span className="text-sm">Add account</span>
          </p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
