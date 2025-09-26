"use server";

import { createUser } from "@/lib/dal/user";
import { createUserSchema } from "../schema/user";

export async function signupAction(rawData: unknown) {
  const parsed = createUserSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.message,
      errors: parsed.error,
    };
  }

  return { success: true, user: await createUser(parsed.data) };
}
