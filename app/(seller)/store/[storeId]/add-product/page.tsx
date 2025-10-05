import ProductForm from "./product-form";
import ProductImages from "./product-upload-images";

export default function AddProduct() {
  return (
    <div>
      <h1 className="text-2xl text-slate-500">
        Add New <span className="text-slate-800">Products</span>
      </h1>
      <ProductImages />
      <ProductForm />
    </div>
  );
}
