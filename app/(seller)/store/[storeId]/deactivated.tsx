import Image from "next/image";
import { Ban, Store } from "lucide-react";
import { assets } from "@/assets/assets";

export default function StoreDeactivatedPage() {
  return (
    <div className="relative flex flex-col min-h-[80vh] items-center justify-center px-6 overflow-hidden bg-background">
      {/* Background Image */}
      <div className="flex items-center justify-center pointer-events-none">
        <Image
          src={assets.deactivated_store}
          alt="Deactivated store background"
          width={1200}
          height={1200}
          className="opacity-30 object-contain"
          priority
        />
      </div>

      {/* Content */}
      <div className="absolute bottom-16 max-w-md text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">
            Your store has been deactivated
          </h1>
          <p className="text-sm text-muted-foreground">
            Your store is currently not accessible and you can no longer manage
            products, orders, or other store settings. This action was taken by
            the admin.
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Store className="size-4" />
          <span>If you believe this is a mistake, please contact support</span>
        </div>
      </div>
    </div>
  );
}
