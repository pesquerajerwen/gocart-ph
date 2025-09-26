import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
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

main()
  .catch((e) => {
    console.error("❌ Seeding failed: ", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
