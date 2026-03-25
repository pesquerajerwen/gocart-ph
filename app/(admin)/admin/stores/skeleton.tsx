import { Card, CardContent } from "@/components/ui/card";

export default function StoreCardSkeleton() {
  return (
    <Card className="md:max-w-2xl animate-pulse">
      <CardContent className="space-y-6">
        {/* Header */}
        <section className="space-y-3">
          <div className="size-24 rounded-full bg-muted" />

          <div className="flex items-center gap-3 flex-wrap">
            <div className="h-5 w-32 rounded bg-muted" />
            <div className="h-4 w-24 rounded bg-muted" />
            <div className="h-5 w-20 rounded-full bg-muted" />
          </div>

          <div className="space-y-2">
            <div className="h-4 w-full rounded bg-muted" />
            <div className="h-4 w-5/6 rounded bg-muted" />
          </div>
        </section>

        {/* Info */}
        <section className="space-y-2">
          <div className="h-4 w-2/3 rounded bg-muted" />
          <div className="h-4 w-1/2 rounded bg-muted" />
          <div className="h-4 w-3/4 rounded bg-muted" />
        </section>

        {/* Footer */}
        <section className="flex justify-between items-end gap-4">
          <div className="space-y-2">
            <div className="h-4 w-40 rounded bg-muted" />
            <div className="flex gap-2 items-center">
              <div className="size-10 rounded-full bg-muted" />
              <div className="space-y-2">
                <div className="h-4 w-24 rounded bg-muted" />
                <div className="h-3 w-40 rounded bg-muted" />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <div className="h-9 w-20 rounded bg-muted" />
            <div className="h-9 w-20 rounded bg-muted" />
          </div>
        </section>
      </CardContent>
    </Card>
  );
}
