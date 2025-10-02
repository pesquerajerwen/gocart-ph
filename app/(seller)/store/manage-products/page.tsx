import DataTable from "./data-table";

export default function ManageProduct() {
  return (
    <div>
      <h1 className="text-2xl text-slate-500">
        Manage <span className="text-slate-800">Products</span>
      </h1>
      <DataTable />
    </div>
  );
}
