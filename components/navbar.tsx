import { getCurrentUserAction } from "@/lib/actions/get-user";
import { Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import AccountMenu from "./account-menu";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const Navbar: React.FC = async () => {
  const user = await getCurrentUserAction();

  return (
    <nav className="border-b">
      <div className="px-6 max-w-7xl m-auto py-3 flex flex-row gap-6 items-center ">
        <div className="flex-1">
          <Link href="/" className="text-4xl font-semibold text-slate-700">
            <span className="text-green-600">go</span>cart
            <span className="text-green-600 text-5xl leading-0">.</span>
          </Link>
        </div>

        <div className="hidden sm:flex flex-row gap-6">
          <Link href={"home"}>Home</Link>
          <Link href={"shop"}>Shop</Link>
          <Link href={"store"} className="border-b-2 border-green-600">
            Seller
          </Link>
          <Link href={"admin"} className="border-b-2 border-green-600">
            Admin
          </Link>
        </div>

        <form className="hidden xl:flex items-center w-xs text-sm gap-2 bg-slate-100 px-4 py-3 rounded-full">
          <Search size={18} className="text-slate-600" />
          <input
            className="w-full bg-transparent outline-none placeholder-slate-600"
            type="text"
            placeholder="Search products"
            required
          />
        </form>

        <div className="flex items-center gap-3 relative">
          <ShoppingCart size={18} />
          <Badge className="absolute -top-1 left-3 text-[8px] text-white bg-slate-600 size-3.5 rounded-full">
            0
          </Badge>
          <p>Cart</p>
        </div>

        {user ? (
          <AccountMenu user={user} />
        ) : (
          <div>
            <Link href="/login">
              <Button className="rounded-full w-24 bg-green-500">Login</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
