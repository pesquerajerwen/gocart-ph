import { PrismaClient } from "@prisma/client";
import seedRole from "./seed-role";
import seedCategories from "./seed-categories";

const prisma = new PrismaClient();

async function main() {
  await seedRole();
  await seedCategories();
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed: ", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
