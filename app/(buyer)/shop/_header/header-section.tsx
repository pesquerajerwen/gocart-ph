import FilterSwitcher from "./filter-switcher";
import Pagination from "./pagination";
import SortFields from "./sort-fields";

export default function HeaderSection() {
  return (
    <section className="bg-slate-50 flex max-sm:flex-col justify-between p-3 rounded-sm gap-3">
      <SortFields />
      <div className="flex flex-1 justify-between">
        <FilterSwitcher />
        <Pagination />
      </div>
    </section>
  );
}
