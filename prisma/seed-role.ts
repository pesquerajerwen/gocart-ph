import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function SeedRole() {
  console.log("🌱 Seeding roles...");

  // Upsert ensures we can run the seed multiple times safely
  await prisma.role.upsert({
    where: { name: "customer" },
    update: {},
    create: {
      name: "customer",
      description: "Default role for customers",
    },
  });

  await prisma.role.upsert({
    where: { name: "admin" },
    update: {},
    create: {
      name: "admin",
      description: "Administrator role with full access",
    },
  });

  console.log("✅ Roles seeding completed.");
}
