import { MapPin, Phone, Mail } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import React from "react";
import { Card, CardContent } from "./ui/card";
import { StoreStatus } from "@/generated/prisma/enums";

type Variant = "pending" | "approved" | "declined";

export type StoreCardProps = {
  children?: React.ReactNode;

  logo: StaticImageData | string;
  name: string;
  username: string;
  status: StoreStatus;
  description: string;

  address: string;
  phone: string;
  email: string;

  appliedDate: string;
  applicantName: string;
  applicantEmail: string;
  applicantAvatar: StaticImageData | string;

  variant?: Variant;
};

export default function StoreCard({
  children,
  logo,
  name,
  username,
  status,
  description,
  address,
  phone,
  email,
  appliedDate,
  applicantName,
  applicantEmail,
  applicantAvatar,
  variant = "pending",
}: StoreCardProps) {
  let actionSlot: React.ReactNode = null;

  React.Children.forEach(children, (child: any) => {
    if (!child) return;
    if (child.type === StoreCard.Action) actionSlot = child;
  });

  const styles = {
    approved: {
      card: "border",
      badge: "bg-green-100 text-green-700",
      text: "text-green-700",
      muted: "text-green-600",
    },
    pending: {
      card: "border",
      badge: "bg-amber-100 text-amber-700",
      text: "text-slate-700",
      muted: "text-slate-600",
    },
    declined: {
      card: "bg-gray-100 border border-gray-200",
      badge: "bg-red-100 text-red-600",
      text: "text-gray-600",
      muted: "text-gray-500",
    },
  }[variant];

  return (
    <Card className={`md:max-w-2xl ${styles.card}`}>
      <CardContent className="space-y-6">
        {/* Header */}
        <section className="space-y-1">
          <div className="size-24 relative rounded-full overflow-hidden shadow">
            <Image src={logo} alt={`${name} logo`} fill />
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <p className="font-bold text-lg">{name}</p>
            <p className="text-slate-500 text-sm">@{username}</p>
            <div
              className={`rounded-full px-4 py-1 text-xs font-bold capitalize ${styles.badge}`}
            >
              {status}
            </div>
          </div>

          <p className={`text-sm ${styles.text}`}>{description}</p>
        </section>

        {/* Info Section */}
        <section className="space-y-1">
          <p className={`${styles.muted} text-sm flex items-center gap-2`}>
            <MapPin className="size-4" /> {address}
          </p>
          <p className={`${styles.muted} text-sm flex items-center gap-2`}>
            <Phone className="size-4" /> {phone}
          </p>
          <p className={`${styles.muted} text-sm flex items-center gap-2`}>
            <Mail className="size-4" /> {email}
          </p>
        </section>

        {/* Footer */}
        <section className="flex justify-between items-end gap-4">
          <section className="space-y-1">
            <p className={`text-sm ${styles.muted}`}>
              Applied on {appliedDate} by
            </p>
            <div className="flex gap-2">
              <div className="size-10 relative rounded-full overflow-hidden">
                <Image src={applicantAvatar} alt={applicantName} fill />
              </div>
              <div>
                <p className="text-sm">{applicantName}</p>
                <p className="text-slate-400 text-sm">{applicantEmail}</p>
              </div>
            </div>
          </section>

          <section className="flex items-center gap-2">{actionSlot}</section>
        </section>
      </CardContent>
    </Card>
  );
}

StoreCard.Action = function StoreCardAction({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
};
