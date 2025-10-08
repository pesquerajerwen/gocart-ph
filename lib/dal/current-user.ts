import { createClient } from "@/utils/supabase-server";
import { prisma } from "../db/client";

export async function getCurrentUser() {
  const supabase = await createClient();

  const currentSession = await supabase.auth.getSession();

  return prisma.user.findUnique({
    where: { supabaseId: currentSession.data.session?.user.id },
  });
}
