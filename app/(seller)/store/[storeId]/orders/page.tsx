import DataTable from "./data-table";
import ProductDialog from "./product-dialog";

export default function Orders() {
  return (
    <div>
      <h1 className="text-2xl text-slate-500">
        Store <span className="text-slate-800">Orders</span>
      </h1>
      <DataTable />
      <ProductDialog />
    </div>
  );
}
