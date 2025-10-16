import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductReviews from "./product-reviews";
import { ProductWithImages } from "@/lib/types/product";

type Props = {
  product: ProductWithImages;
};

export default function ProductTabs({ product }: Props) {
  return (
    <div className="flex w-full max-w-xl flex-col gap-6">
      <Tabs defaultValue="reviews">
        <TabsList className="w-full">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="py-3">
          <p className="text-sm text-slate-600">{product.description}</p>
        </TabsContent>
        <TabsContent value="reviews" className="py-3">
          <ProductReviews productId={product.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
