"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Store } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="w-full flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full  md:max-w-2xl"
      >
        <div className="flex flex-col items-center text-center p-8 gap-6 ">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-center size-16 rounded-full bg-muted"
          >
            <Store className="size-8 text-muted-foreground" />
          </motion.div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold">No approved stores yet</h2>
            <p className="text-sm text-muted-foreground">
              There are currently no stores that have been approved. Once store
              applications are reviewed and approved, they will appear here.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle2 className="size-4 text-green-500" />
            <span>No approved stores available</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
