import Image, { StaticImageData } from "next/image";
import StarRating from "./star-rating";
import { cn } from "@/lib/utils";

export type Product = {
  id: string;
  image: StaticImageData;
  name: string;
  price: number;
  rating: number;
  imageClass?: string;
};

const ProductCard: React.FC<Product> = ({
  image,
  name,
  price,
  rating,
  imageClass,
}) => {
  return (
    <div className="flex flex-col gap-2 group cursor-pointer">
      <div className="relative bg-slate-100 p-4 rounded-lg flex justify-center items-center ">
        <Image
          src={image}
          alt="Product 1"
          className={cn(
            "max-h-40 w-auto group-hover:scale-110 transition-all",
            imageClass
          )}
        />
      </div>
      <div>
        <div className="flex justify-between text-sm">
          <p>{name}</p>
          <p>${price}</p>
        </div>
        <StarRating rating={rating} />
      </div>
    </div>
  );
};

export default ProductCard;
