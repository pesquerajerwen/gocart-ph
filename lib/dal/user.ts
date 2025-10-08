import { prisma } from "../db/client";
import { faker } from "@faker-js/faker";

export type CreateUserProp = {
  email: string;
  supabaseId?: string;
  firstName?: string;
  lastName?: string;
  avatar_url?: string;
};

export async function getUsers() {
  return prisma.user.findMany();
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({ where: { id } });
}

export async function getUserBySupabaseId(id: string) {
  return prisma.user.findUnique({ where: { supabaseId: id } });
}

export async function createUser(data: CreateUserProp) {
  const role = await prisma.role.findFirst({ where: { name: "customer" } });

  if (!role) throw new Error("Customer role not found.");

  const existing = await prisma.user.findFirst({
    where: { email: data.email },
  });

  console.log("existing", existing);

  if (existing) throw new Error("An account with this email already exists.");

  return prisma.user.create({
    data: {
      email: data.email,
      firstName: data.firstName || faker.animal.dog(),
      lastName: data.lastName,
      avatarUrl: data.avatar_url,
      supabaseId: data.supabaseId,
      roleId: role.id,
    },
  });
}

export async function upsertUser(data: CreateUserProp) {
  const role = await prisma.role.findFirst({ where: { name: "customer" } });

  if (!role) throw new Error("Customer role not found");

  return prisma.user.upsert({
    where: { email: data.email },
    update: {
      firstName: data.firstName || faker.animal.dog(),
      lastName: data.lastName,
      avatarUrl: data.avatar_url,
    },
    create: {
      email: data.email,
      firstName: data.firstName || faker.animal.dog(),
      lastName: data.lastName,
      avatarUrl: data.avatar_url,
      supabaseId: data.supabaseId,
      roleId: role.id,
    },
  });
}
