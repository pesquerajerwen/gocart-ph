import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase-middleware";

const AuthenticatedPaths = ["/store", "/create-store"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (AuthenticatedPaths.some((path) => pathname.startsWith(path))) {
    const authResponse = await updateSession(request);

    authResponse.headers.set("x-url", request.url);
    return authResponse;
  }

  const requestHeaders = new Headers(request.headers);

  requestHeaders.set("x-url", request.url);
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/auth).*)"],
};
