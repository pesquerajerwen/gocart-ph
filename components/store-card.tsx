import { assets } from "@/assets/assets";
import { MapPin, Phone, Mail } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Card, CardContent } from "./ui/card";

type StoreCardProps = {
  children?: React.ReactNode;
};

export default function StoreCard({ children }: StoreCardProps) {
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
            <Image src={assets.gs_logo} alt={"store_logo"} fill />
          </div>
          <div className="flex items-center gap-3">
            <p className="font-bold text-lg">GreatStack</p>
            <p className="text-slate-500 text-sm">@greatstack</p>
            <div className="rounded-full bg-green-100 text-green-700 px-4 py-1 text-xs font-bold items-center flex">
              Approved
            </div>
          </div>

          <p className="text-sm text-slate-600">
            GreatStack is the education marketplace where you can buy goodies
            related to coding and tech
          </p>
        </section>

        {/* Info Section */}
        <section className="space-y-1">
          <p className="text-slate-600 text-sm gap-2 flex items-center">
            <MapPin className="size-4 text-slate-600 " /> 794 Francisco, 94102
          </p>
          <p className="text-slate-600 text-sm gap-2 flex items-center">
            <Phone className="size-4 text-slate-600 " /> +1-212-456-7890
          </p>
          <p className="text-slate-600 text-sm gap-2 flex items-center">
            <Mail className="size-4 text-slate-600 " /> greatstack@example.com
          </p>
        </section>

        {/* Footer + Action Slot */}
        <section className="space-y-1 flex justify-between items-end">
          <section className="space-y-1">
            <p className="text-sm text-slate-600">Applied on 8/22/2025 by</p>
            <div className="flex gap-2">
              <div className="size-10 relative rounded-full overflow-hidden">
                <Image src={assets.user_icon} alt={"store_logo"} fill />
              </div>
              <div>
                <p className="text-sm">GreatStack</p>
                <p className="text-slate-400 text-sm">
                  user.greatstack@gmail.com
                </p>
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
