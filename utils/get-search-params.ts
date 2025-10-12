// utility to read the header (this is correct)

import "server-only";
import { headers } from "next/headers";

export async function getSearchParams() {
  // headers() correctly reads the incoming request headers
  const headerList = await headers();

  const url = headerList.get("x-url");

  if (!url) {
    throw new Error("Missing x-url header. Make sure middleware sets it.");
  }

  const parsedUrl = new URL(url);
  return parsedUrl.searchParams;
}
