"use client";

import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useEffect } from "react";

interface CartIconProps {
  itemCount: number;
  onClick: () => void;
}

export function CartIcon({ itemCount, onClick }: CartIconProps) {
  const controls = useAnimation();

  // Bounce animation when item count changes
  useEffect(() => {
    if (itemCount > 0) {
      controls.start({
        scale: [1, 1.4, 1],
        transition: { duration: 0.4, ease: "easeOut" },
      });
    }
  }, [itemCount, controls]);

  return (
    <motion.button
      onClick={onClick}
      className="relative p-3 hover:bg-gray-100 rounded-full transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <ShoppingBag size={24} />

      {/* Badge with bounce animation */}
      <AnimatePresence>
        {itemCount > 0 && (
          <motion.span
            className="absolute -top-1 -right-1 bg-black text-white text-xs min-w-5 h-5 flex items-center justify-center rounded-full font-bold px-1"
            initial={{ scale: 0, opacity: 0 }}
            animate={controls}
            exit={{ scale: 0, opacity: 0 }}
          >
            {itemCount > 99 ? "99+" : itemCount}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
