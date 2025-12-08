import { getStore } from "@/lib/dal/store";
import { getCurrentUser } from "@/lib/dal/user";
import Link from "next/link";
import React from "react";

const websites = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Privacy Policy",
    link: "/privacy-policy",
  },
  {
    name: "Become Plus Member",
    link: "#",
  },
  {
    name: "Create Your Store",
    link: "/create-store",
  },
];

export default async function Website() {
  const user = await getCurrentUser();

  const store = await getStore({ userId: user?.id });

  return (
    <React.Fragment>
      <h3 className="text-sm">WEBSITE?</h3>
      <div className="flex flex-col gap-2 mt-4">
        {websites.map((website) => {
          if (!!store && website.name === "Create Your Store") return null;

          return (
            <Link
              key={website.name}
              href={website.link}
              className="text-slate-500 text-sm hover:underline"
            >
              {website.name}
            </Link>
          );
        })}
      </div>
    </React.Fragment>
  );
}
