import { MapPin, Phone, Mail } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import React from "react";
import { Card, CardContent } from "./ui/card";

export type StoreCardProps = {
  children?: React.ReactNode;

  // Store info
  logo: StaticImageData | string;
  name: string;
  username: string;
  statusLabel: string;
  statusColorClass?: string; // e.g. "bg-green-100 text-green-700"
  description: string;

  // Contact info
  address: string;
  phone: string;
  email: string;

  // Applicant info
  appliedDate: string;
  applicantName: string;
  applicantEmail: string;
  applicantAvatar: StaticImageData | string;
};

export default function StoreCard({
  children,
  logo,
  name,
  username,
  statusLabel,
  statusColorClass = "bg-green-100 text-green-700",
  description,
  address,
  phone,
  email,
  appliedDate,
  applicantName,
  applicantEmail,
  applicantAvatar,
}: StoreCardProps) {
  let actionSlot: React.ReactNode = null;

  React.Children.forEach(children, (child: any) => {
    if (!child) return;
    if (child.type === StoreCard.Action) actionSlot = child;
  });

  return (
    <Card className="md:max-w-2xl">
      <CardContent className="space-y-6">
        {/* Header Section */}
        <section className="space-y-1">
          <div className="size-24 relative rounded-full overflow-hidden shadow">
            <Image src={logo} alt={`${name} logo`} fill />
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <p className="font-bold text-lg">{name}</p>
            <p className="text-slate-500 text-sm">@{username}</p>
            <div
              className={`rounded-full px-4 py-1 text-xs font-bold flex items-center ${statusColorClass}`}
            >
              {statusLabel}
            </div>
          </div>

          <p className="text-sm text-slate-600">{description}</p>
        </section>

        {/* Info Section */}
        <section className="space-y-1">
          <p className="text-slate-600 text-sm gap-2 flex items-center">
            <MapPin className="size-4" /> {address}
          </p>
          <p className="text-slate-600 text-sm gap-2 flex items-center">
            <Phone className="size-4" /> {phone}
          </p>
          <p className="text-slate-600 text-sm gap-2 flex items-center">
            <Mail className="size-4" /> {email}
          </p>
        </section>

        {/* Footer + Action Slot */}
        <section className="flex justify-between items-end gap-4">
          <section className="space-y-1">
            <p className="text-sm text-slate-600">
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

          {/* Action Slot */}
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
