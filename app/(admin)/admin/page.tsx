import Dashboard from "./dashboard";
import OrderChart from "./order-chart";

export default function AdminPage() {
  return (
    <div className="max-w-4xl">
      <Dashboard />
      <OrderChart />
    </div>
  );
}
