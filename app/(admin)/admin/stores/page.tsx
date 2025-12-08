import StoreCard from "@/components/store-card";
import { Switch } from "@/components/ui/switch";

export default function StoresPage() {
  return (
    <div className=" w-full">
      <h1 className="text-2xl text-slate-500">
        Live <span className="text-slate-800">Stores</span>
      </h1>
      <section className="mt-8 space-y-6">
        {new Array(5).fill(null).map((i, index) => (
          <StoreCard key={index}>
            <StoreCard.Action>
              <p className="text-slate-400 text-sm">Active</p> <Switch />
            </StoreCard.Action>
          </StoreCard>
        ))}
      </section>
    </div>
  );
}
