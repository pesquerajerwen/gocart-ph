import { Fragment } from "react";
import ReviewItem from "./review-item";
import { Separator } from "@/components/ui/separator";

const ReviewsArray = [
  {
    avatar_url: undefined,
    dateTime: "Fri Aug 22 2025",
    name: "GreatStack",
    message: `I was a bit skeptical at first, but this product turned out to be even
            better than I imagined. The quality feels premium, it’s easy to use,
            and it delivers exactly what was promised. I’ve already recommended it
            to friends and will definitely purchase again in the future.`,
    category: "Electronics",
    rating: 5,
    href: "",
  },
  {
    avatar_url: undefined,
    dateTime: "Sat Sep 13 2025",
    name: "TechGuru",
    message: `Solid build quality and sleek design. Setup was quick and painless.
            It has already become part of my daily workflow.`,
    category: "Electronics",
    rating: 4,
    href: "",
  },
  {
    avatar_url: undefined,
    dateTime: "Mon Jul 07 2025",
    name: "Shopaholic123",
    message: `I’ve bought many similar products before, but this one clearly stands out.
            Worth every penny.`,
    category: "Lifestyle",
    rating: 5,
    href: "",
  },
  {
    avatar_url: undefined,
    dateTime: "Wed Oct 01 2025",
    name: "DailyUser",
    message: `Good performance overall, but I wish the battery lasted longer. Still, I’d
            recommend it for the price.`,
    category: "Gadgets",
    rating: 3,
    href: "",
  },
  {
    avatar_url: undefined,
    dateTime: "Thu May 15 2025",
    name: "CreativeMind",
    message: `This product has helped me streamline my creative work. Compact, reliable,
            and definitely worth trying.`,
    category: "Productivity",
    rating: 4,
    href: "",
  },
  {
    avatar_url: undefined,
    dateTime: "Tue Jun 10 2025",
    name: "EcoBuyer",
    message: `Love that the brand focuses on eco-friendly packaging. Feels like I made
            a sustainable choice without compromising quality.`,
    category: "Home",
    rating: 5,
    href: "",
  },
  {
    avatar_url: undefined,
    dateTime: "Sun Nov 30 2025",
    name: "CasualGamer",
    message: `Handles games well and runs smoothly. Gets a bit warm after long sessions,
            but nothing too bad.`,
    category: "Gaming",
    rating: 4,
    href: "",
  },
  {
    avatar_url: undefined,
    dateTime: "Fri Dec 19 2025",
    name: "TravelerX",
    message: `Perfect for travel! Lightweight and easy to carry around. I brought it on
            my last trip and it was super handy.`,
    category: "Travel",
    rating: 5,
    href: "",
  },
  {
    avatar_url: undefined,
    dateTime: "Mon Mar 17 2025",
    name: "HealthNut",
    message: `Surprisingly useful for my daily fitness routine. I didn’t think I’d use it
            this much, but now I can’t go without it.`,
    category: "Fitness",
    rating: 4,
    href: "",
  },
  {
    avatar_url: undefined,
    dateTime: "Sat Apr 05 2025",
    name: "NightOwl",
    message: `Bought this on a whim, but I’ve been pleasantly surprised. Works great late
            at night when I need it most.`,
    category: "Accessories",
    rating: 5,
    href: "",
  },
];

export default function Reviews() {
  return (
    <div>
      <p className="text-slate-500 my-10">Total Reviews</p>
      <div className="flex flex-col gap-6 mb-40">
        {ReviewsArray.map((item, index) => (
          <Fragment key={index}>
            <ReviewItem {...item} />
            <Separator />
          </Fragment>
        ))}
      </div>
    </div>
  );
}
