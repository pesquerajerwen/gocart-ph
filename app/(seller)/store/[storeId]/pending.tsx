import { Clock, Store } from "lucide-react";

export default function StorePendingPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-6">
      <div className="max-w-md text-center space-y-6">
        <div className="flex justify-center">
          <div className="rounded-full bg-yellow-100 p-4">
            <Clock className="size-8 text-yellow-600" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Your store is under review</h1>
          <p className="text-sm text-muted-foreground">
            Thanks for setting up your store. Our team is currently reviewing
            your application. You’ll be able to access and manage your store
            once it has been approved.
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Store className="size-4" />
          <span>Approval usually takes a short time</span>
        </div>
      </div>
    </div>
  );
}
