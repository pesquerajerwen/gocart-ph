"use client";

import Link from "next/dist/client/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

export default function LoginButton() {
  const path = usePathname();

  const next = path === "/" ? "" : "?next=" + path;

  return (
    <div>
      <Link href={`/login${next}`}>
        <Button className="rounded-full w-24 bg-green-500">Login</Button>
      </Link>
    </div>
  );
}
