import { upsertUser } from "@/lib/dal/user";
import { createClient } from "@/utils/supabase-server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // if "next" is in param, use it as the redirect URL
  let next = searchParams.get("next") ?? "/";
  if (!next.startsWith("/")) {
    // if "next" is not a relative URL, use the default
    next = "/";
  }

  if (code) {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_SITE_URL}/google/auth-code-error`
      );
    }

    const nameParts = data.user.user_metadata.full_name.split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

    await upsertUser({
      email: data.user.email!,
      firstName: firstName,
      lastName: lastName,
      avatar_url: data.user.user_metadata.avatar_url,
      supabaseId: data.user.id,
    });

    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}${next}`);
  }
}
