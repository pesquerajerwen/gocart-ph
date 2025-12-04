import Dashboard from "./dashboard";
import Reviews from "./reviews";

export default async function StorePage({
  params,
}: {
  params: { storeId: string };
}) {
  const { storeId } = await params;

  return (
    <div className="max-w-4xl">
      <Dashboard storeId={storeId} />
      <Reviews />
    </div>
  );
}
