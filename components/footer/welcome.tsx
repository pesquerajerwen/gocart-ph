import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from "@/assets/icons";
import Link from "next/link";
import React from "react";

const socials = [
  {
    id: 1,
    icon: FacebookIcon,
    link: "#",
  },
  {
    id: 2,
    icon: InstagramIcon,
    link: "#",
  },
  {
    id: 3,
    icon: TwitterIcon,
    link: "#",
  },
  {
    id: 4,
    icon: LinkedinIcon,
    link: "#",
  },
];

export default function Welcome() {
  return (
    <React.Fragment>
      <div>
        <Link href="/" className="text-4xl font-semibold text-slate-700">
          <span className="text-green-600">go</span>cart
          <span className="text-green-600 text-5xl">.</span>
        </Link>
      </div>
      <p className="text-sm max-w-md text-slate-500">
        Welcome to gocart, your ultimate destination for the latest and smartest
        gadgets. From smartphones and smartwatches to essential accessories, we
        bring you the best in innovation — all in one place.
      </p>
      <div className="flex gap-3">
        {socials.map((social, index) => (
          <Link
            key={social.id}
            href={social.link}
            className="rounded-full size-10 bg-slate-100 flex items-center justify-center hover:scale-105 transition hover:border hover:border-slate-300"
          >
            <social.icon />
          </Link>
        ))}
      </div>
    </React.Fragment>
  );
}
