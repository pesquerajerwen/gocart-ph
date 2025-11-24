import { X } from "lucide-react"; // Icon for close button
import Image from "next/image";
import { useEffect, useState, ReactNode } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

interface CarouselDialogProps {
  open: boolean;
  imageURLs: string[];
  initialIndex?: number;
  renderItem?: (url: string, index: number) => ReactNode;
  onClose: () => void;
}

export function CarouselDialog({
  open,
  imageURLs,
  initialIndex = 0,
  renderItem,
  onClose,
}: CarouselDialogProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    // Scroll to initial index when carousel initializes
    api.scrollTo(initialIndex, true); // false = no animation

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api, initialIndex]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Dark backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 rounded-full bg-gray-200 p-1 hover:bg-gray-300 z-20"
      >
        <X className="h-5 w-5" />
      </button>

      {/* Modal content */}
      <div className="relative z-10 mx-auto max-w-2xl w-full">
        <Carousel setApi={setApi} className="w-full" opts={{ loop: true }}>
          <CarouselContent>
            {imageURLs.map((url, index) => (
              <CarouselItem key={index} className="flex justify-center">
                {renderItem ? (
                  renderItem(url, index)
                ) : (
                  <Image
                    src={url}
                    alt={`Slide ${index + 1}`}
                    width={600} // auto width fallback
                    height={400} // auto height fallback
                    className="max-w-full h-auto max-h-[90vh] object-contain"
                  />
                )}
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        {/* Slide counter */}
        <div className="text-white py-2 text-center text-xl">
          {current} of {count}
        </div>
      </div>
    </div>
  );
}
