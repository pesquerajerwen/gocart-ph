import Dashboard from "./dashboard";
import Reviews from "./reviews";

export default async function StorePage() {
  return (
    <div className="max-w-4xl">
      <Dashboard />
      <Reviews />
    </div>
  );
}
