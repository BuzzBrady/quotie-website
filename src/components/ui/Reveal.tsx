"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

/** Fade-and-rise on scroll into view. The one scroll effect the site uses. */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  y = 16,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={isInView || reduce ? { opacity: 1, y: 0 } : {}}
      transition={
        reduce
          ? { duration: 0 }
          : { duration: 0.55, delay, ease: [0.2, 0.7, 0.2, 1] }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}
