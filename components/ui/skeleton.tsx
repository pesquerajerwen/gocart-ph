import { cn } from "@/utils/tailwind";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      {...props}
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
    />
  );
}

export { Skeleton };
