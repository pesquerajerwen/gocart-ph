import "server-only";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function redirectToLogin() {
  const headersList = await headers();
  const fullUrl = headersList.get("x-url") ?? "";

  const pathname = fullUrl ? new URL(fullUrl).pathname : "/";

  redirect("/login?next=" + encodeURIComponent(pathname));
}
