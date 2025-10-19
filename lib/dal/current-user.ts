import { createClient } from "@/utils/supabase-server";
import { prisma } from "../db/client";

export async function getCurrentUser() {
  const supabase = await createClient();

  const currentUser = await supabase.auth.getUser();

  return prisma.user.findUnique({
    where: { supabaseId: currentUser.data.user?.id },
  });
}
