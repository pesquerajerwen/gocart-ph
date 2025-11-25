import { assets } from "@/assets/assets";
import { cn } from "@/utils/tailwind";
import Image from "next/image";
import QuantityField from "./quantity-field";
import DeleteIcon from "./delete-icon";
import Link from "next/link";
import { CartItemWithProduct } from "@/lib/types/cart";

type Props = {
  cartItem: CartItemWithProduct;
};

export default function CartItem({ cartItem }: Props) {
  const { product } = cartItem;

  const primaryImage = product.productImages.find((p) => p.isPrimary);

  return (
    <div className="grid grid-cols-5 sm:grid-cols-6 items-center">
      <div className="col-span-3">
        <div className="flex gap-2">
          <div
            className={cn(
              "bg-slate-100 p-2 rounded-sm flex justify-center items-center"
            )}
          >
            <div className={cn("relative size-12")}>
              <Link href={`/product/${product.id}`}>
                <Image
                  src={primaryImage?.url || assets.image_not_available}
                  alt="Product Image"
                  className="object-cover"
                  sizes="(max-width: 640px) 8rem, (max-width: 1024px) 10rem, 12rem"
                  fill
                />
              </Link>
            </div>
          </div>
          <div>
            <Link href={`/product/${product.id}`}>
              <p>{product.name}</p>
            </Link>
            <p className="text-xs text-slate-500">{product.categorySlug}</p>
            <p className="text-slate-600">
              P {Number(product.offerPrice).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
      <div className="col-span-1 flex justify-center">
        <QuantityField product={product} quantity={cartItem.quantity} />
      </div>
      <div className="col-span-1 flex justify-center">
        <p className="text-slate-600">
          P {(cartItem.quantity * Number(product.offerPrice)).toFixed(2)}
        </p>
      </div>
      <div className="col-span-1 flex justify-center max-sm:hidden">
        <DeleteIcon productId={product.id} />
      </div>
    </div>
  );
}
