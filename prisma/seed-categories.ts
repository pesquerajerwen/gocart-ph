import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function SeedCategories() {
  const categories = [
    {
      name: "Fruits & Vegetables",
      description: "Fresh and organic produce sourced from local farms.",
    },
    {
      name: "Dairy & Eggs",
      description: "Milk, cheese, butter, and farm-fresh eggs.",
    },
    {
      name: "Bakery & Snacks",
      description: "Breads, pastries, and a variety of tasty snacks.",
    },
    {
      name: "Beverages",
      description: "Juices, coffee, tea, and refreshing drinks.",
    },
    {
      name: "Pantry Essentials",
      description: "Rice, pasta, canned goods, and cooking oils.",
    },
    {
      name: "Meat & Seafood",
      description: "Quality meat and sustainably sourced seafood.",
    },
    {
      name: "Frozen Foods",
      description: "Convenient and ready-to-cook frozen meals.",
    },
    {
      name: "Health & Wellness",
      description: "Supplements, vitamins, and personal care items.",
    },
    {
      name: "Home & Cleaning",
      description: "Eco-friendly cleaning supplies and home essentials.",
    },
    {
      name: "Pet Supplies",
      description: "Food, treats, and accessories for your pets.",
    },
  ];

  console.log("🌱 Seeding categories...");

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    });
  }

  console.log("✅ Categories seeded successfully!");
}
