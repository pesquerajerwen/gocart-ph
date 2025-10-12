import Pagination from "./pagination";
import SortFields from "./sort-fields";

export default function HeaderSection() {
  return (
    <section className="bg-slate-50 flex justify-between p-3 rounded-sm">
      <SortFields />
      <Pagination />
    </section>
  );
}
