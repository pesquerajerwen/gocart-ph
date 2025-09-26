import { prisma } from "../db/client"; // your Prisma client

export type CreateUserProp = {
  email: string;
  firstName?: string;
  lastName?: string;
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

  if (!role) throw new Error("Customer role not found");

  return prisma.user.create({
    data: {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      supabaseId: null,
      googleId: null,
      roleId: role.id,
    },
  });
}
