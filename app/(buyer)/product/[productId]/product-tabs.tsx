import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductWithImagesAndStore } from "@/lib/types/product";
import ProductDescription from "./product-description";
import ProductReviews from "./product-reviews";

type Props = {
  product: ProductWithImagesAndStore;
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
          <ProductDescription product={product} />
        </TabsContent>
        <TabsContent value="reviews" className="py-3">
          <ProductReviews productId={product.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
