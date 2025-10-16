import { getCurrentUser } from "@/lib/dal/user";
import Link from "next/link";
import AccountMenu from "./account-menu";
import { Button } from "../ui/button";
import Cart from "./cart";
import NavLinks from "./links";
import Logo from "./logo";
import SearchField from "./search-field";
import LoginButton from "./login-button";

export default async function Navbar() {
  const user = await getCurrentUser();

  return (
    <nav className="border-b">
      <div className="px-6 max-w-7xl m-auto py-3 flex flex-row gap-6 items-center ">
        <Logo />

        <NavLinks userId={user?.id} />

        <SearchField />

        <Cart userId={user?.id} />

        {user ? <AccountMenu user={user} /> : <LoginButton />}
      </div>
    </nav>
  );
}
