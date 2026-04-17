import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/utils";

export function StatCard({ title, value, icon: Icon, description, className, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ delay, duration: 0.4, type: "spring", stiffness: 100 }}
      className={cn(
        "relative overflow-hidden rounded-2xl glass p-1",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
      <div className="relative h-full w-full rounded-xl p-6">
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <h3 className="tracking-tight text-sm font-medium">{title}</h3>
          {Icon && <div className="p-2 bg-primary/10 rounded-lg"><Icon className="h-4 w-4 text-primary" /></div>}
        </div>
        <div className="pt-2">
          <div className="text-3xl font-bold tracking-tight">{value}</div>
          {description && (
            <p className="text-xs text-muted-foreground mt-2 font-medium">{description}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
