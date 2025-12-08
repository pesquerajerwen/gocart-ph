import Link from "next/link";
import React from "react";

const categories = [
  {
    name: "Earphones",
    link: "#",
  },
  {
    name: "Headphones",
    link: "#",
  },
  {
    name: "Smartphones",
    link: "#",
  },
  {
    name: "Laptops",
    link: "#",
  },
];

export default function Products() {
  return (
    <React.Fragment>
      <h3 className="text-sm">PRODUCTS</h3>
      <div className="flex flex-col gap-2 mt-4">
        {categories.map((category, index) => (
          <Link
            key={category.name}
            href={category.link}
            className="text-slate-500 text-sm hover:underline"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </React.Fragment>
  );
}
