import { prisma } from "@/lib/db/client";
import seedCategories from "./seed-categories";
import seedRole from "./seed-role";

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
