import { getCategoriesAction } from "@/lib/actions/get-categories";
import CategoryHydrator from "./categories-hydrator";
import ProductForm from "./product-form";

export default async function AddProductPage() {
  const categories = await getCategoriesAction();

  return (
    <div>
      <h1 className="text-2xl text-slate-500">
        Add New <span className="text-slate-800">Products</span>
      </h1>

      <CategoryHydrator categories={categories}>
        <ProductForm />
      </CategoryHydrator>
    </div>
  );
}
