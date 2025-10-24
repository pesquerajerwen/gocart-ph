"use client";

import { GoogleIcon } from "@/assets/icons";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase-client";
import { useQueryState } from "nuqs";

export default function GoogleSignin() {
  const supabase = createClient();
  const [next] = useQueryState("next", { defaultValue: "/" });

  const handleOnClick = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${
          window.location.origin
        }/google/confirm?next=${encodeURIComponent(next)}`,
        queryParams: {
          access: "offline",
        },
      },
    });
    if (error) console.error(error);
    // data.url may be present if you want to manually redirect:
    if (data?.url) window.location.href = data.url;
  };

  return (
    <Button
      type="button"
      variant="outline"
      className="w-full"
      onClick={handleOnClick}
    >
      <GoogleIcon className="size-5" />
      Continue with Google
    </Button>
  );
}
