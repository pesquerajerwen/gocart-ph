import StoreCard from "@/components/store-card";
import { Button } from "@/components/ui/button";

export default function ApproveStore() {
  return (
    <div>
      <h1 className="text-2xl text-slate-500">
        Approve <span className="text-slate-800">Stores</span>
      </h1>
      <section className="mt-8 space-y-6">
        {new Array(5).fill(null).map((i, index) => (
          <StoreCard key={index}>
            <StoreCard.Action>
              <Button className="w-20">Approve</Button>
              <Button className="w-20" variant="secondary">
                Reject
              </Button>
            </StoreCard.Action>
          </StoreCard>
        ))}
      </section>
    </div>
  );
}
