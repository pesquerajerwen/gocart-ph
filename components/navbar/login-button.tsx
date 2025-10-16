import Link from "next/dist/client/link";
import { Button } from "../ui/button";

export default function LoginButton() {
  return (
    <div>
      <Link href="/login">
        <Button className="rounded-full w-24 bg-green-500">Login</Button>
      </Link>
    </div>
  );
}
