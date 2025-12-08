import { Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import React from "react";

const contact = [
  {
    name: "+1-212-456-7890",
    link: "#",
    icon: Phone,
  },
  {
    name: "contact@example.com",
    link: "#",
    icon: Mail,
  },
  {
    name: "794 Francisco, 94102",
    link: "#",
    icon: MapPin,
  },
];

export default function Contacts() {
  return (
    <React.Fragment>
      <h3 className="text-sm">CONTACT</h3>
      <div className="flex flex-col gap-2 mt-4">
        {contact.map((contact, index) => (
          <Link
            key={contact.name}
            href={contact.link}
            className="text-slate-500 text-sm gap-2 flex items-center hover:underline"
          >
            <contact.icon className="size-4 text-slate-400 " /> {contact.name}
          </Link>
        ))}
      </div>
    </React.Fragment>
  );
}
