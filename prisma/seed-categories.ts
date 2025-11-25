import { prisma } from "@/lib/db/client";
import slugify from "slugify";

export default async function SeedCategories() {
  const categories = [
    {
      name: "Smartphones",
      description:
        "Latest smartphones from top brands with cutting-edge technology.",
    },
    {
      name: "Laptops & Computers",
      description:
        "High-performance laptops, desktops, and accessories for work or gaming.",
    },
    {
      name: "Tablets & eReaders",
      description:
        "Portable devices for reading, browsing, and entertainment on the go.",
    },
    {
      name: "Wearables",
      description:
        "Smartwatches, fitness trackers, and other connected wearables.",
    },
    {
      name: "Audio & Headphones",
      description: "Headphones, speakers, and audio gear for music lovers.",
    },
    {
      name: "Cameras & Drones",
      description:
        "DSLRs, action cams, and drones for photography and videography enthusiasts.",
    },
    {
      name: "Gaming",
      description:
        "Consoles, gaming accessories, and high-end peripherals for gamers.",
    },
    {
      name: "Smart Home",
      description:
        "IoT devices and home automation solutions for a connected lifestyle.",
    },
    {
      name: "Accessories",
      description:
        "Chargers, cables, cases, and other essential gadget accessories.",
    },
    {
      name: "Networking & Storage",
      description: "Routers, drives, and cloud-connected storage devices.",
    },
  ];

  console.log("🌱 Seeding categories...");

  for (const category of categories) {
    const slug = slugify(category.name, { lower: true });

    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: {
        ...category,
        slug,
      },
    });
  }

  console.log("✅ Categories seeded successfully!");
}
