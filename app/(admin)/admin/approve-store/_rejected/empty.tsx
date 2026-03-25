import { Card, CardContent } from "@/components/ui/card";
import { XCircle, Store } from "lucide-react";
import { motion } from "framer-motion";

export default function EmptyStateRejected() {
  return (
    <div className="md:max-w-2xl flex items-center justify-center border rounded-lg py-16 shadow">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full md:max-w-2xl"
      >
        <div className="flex flex-col items-center text-center p-8 gap-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-center size-16 rounded-full bg-red-100"
          >
            <Store className="size-8 text-red-500" />
          </motion.div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold">No rejected stores</h2>
            <p className="text-sm text-muted-foreground">
              There are currently no rejected store applications. Any declined
              requests will appear here for review and tracking.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <XCircle className="size-4 text-red-500" />
            <span>No rejected applications</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
