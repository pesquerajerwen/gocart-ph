"use server";

import { getUserBySupabaseId } from "@/lib/dal/user";
import { createClient } from "@/utils/supabase-server";

export async function getCurrentUserAction() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    return null;
  }

  const user = await getUserBySupabaseId(data.user.id);

  return user;
}
