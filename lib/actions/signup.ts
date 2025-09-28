"use server";

import { createUser } from "@/lib/dal/user";
import { createUserSchema } from "../schema/user";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function signupAction(rawData: unknown) {
  const parsed = createUserSchema.safeParse(rawData);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.message,
      errors: parsed.error,
    };
  }

  let user = null;

  try {
    user = await createUser(parsed.data);
  } catch (error) {
    return {
      success: false,
      message: (error as Error).message,
      error,
    };
  }

  return { success: true, user };
}
