import StoreCard from "@/components/store-card";
import { getStores } from "@/lib/dal/store";
import dayjs from "dayjs";
import { capitalize } from "lodash";
import StoreCardAction from "./card-action";
import Empty from "./empty";

export default async function StoresPage() {
  const stores = await getStores({
    page: 1,
    size: 10,
    status: ["verified", "deactivated"],
  });

  if (!stores.data || stores.data.length === 0) {
    return <Empty />;
  }

  return (
    <div className=" w-full">
      <h1 className="text-2xl text-slate-500">
        Live <span className="text-slate-800">Stores</span>
      </h1>
      <section className="mt-8 space-y-6">
        {stores.data.map((store, index) => (
          <StoreCard
            key={index}
            logo={store.avatarUrl}
            name={store.name}
            username={store.name.replace(/\s+/g, "").toLowerCase()}
            statusLabel={capitalize(store.status)}
            description={store.description}
            address={store.address}
            phone={store.contact}
            email={store.user?.email || ""}
            appliedDate={dayjs(store.createdAt).format("MMMM D, YYYY")}
            applicantName={store.user.firstName + " " + store.user.lastName}
            applicantEmail={store.user?.email || ""}
            applicantAvatar={store.user?.avatarUrl || ""}
          >
            <StoreCard.Action>
              <StoreCardAction storeId={store.id} />
            </StoreCard.Action>
          </StoreCard>
        ))}
      </section>
    </div>
  );
}
