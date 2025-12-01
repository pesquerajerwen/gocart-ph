import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

type InfiniteScrollLoaderProps = {
  isFetchingNextPage: boolean;
  hasNextPage?: boolean;
};

export function InfiniteScrollLoader({
  isFetchingNextPage,
  hasNextPage,
}: InfiniteScrollLoaderProps) {
  if (!hasNextPage && !isFetchingNextPage) return null;

  return (
    <div className="flex justify-center py-6">
      {isFetchingNextPage ? (
        <motion.div
          className="flex items-center gap-2 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Loader2 className="size-4 animate-spin" />
          <span>Loading more...</span>
        </motion.div>
      ) : (
        <motion.div
          className="text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          You’ve reached the end!
        </motion.div>
      )}
    </div>
  );
}
