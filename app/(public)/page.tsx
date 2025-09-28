import BestSelling from "@/components/best-selling";
import Hero from "@/components/hero";
import LatestProducts from "@/components/latest-products";
import NewsLetter from "@/components/news-letter";
import Specification from "@/components/specification";

export default function Home() {
  return (
    <div>
      <Hero />
      <LatestProducts />
      <BestSelling />
      <Specification />
      <NewsLetter />
    </div>
  );
}
