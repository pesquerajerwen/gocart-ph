import { assets } from "@/assets/assets";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function EmptyCart() {
  return (
    <div className="flex flex-col gap-6 justify-center items-center h-[60vh]">
      <Image
        src={assets.empty_cart}
        alt="Empty Cart"
        height={400}
        width={300}
      />
      <div>
        <h2 className="text-slate-800 text-xl text-center">
          Nothing in your cart yet.
        </h2>
        <p className="text-slate-500">
          Find the perfect item and we’ll keep it safe right here for you.
        </p>
      </div>
      <Link href="/shop">
        <Button className="w-32 rounded-full">Shop Now</Button>
      </Link>
    </div>
  );
}
