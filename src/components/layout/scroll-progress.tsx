"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin gold scroll-progress bar pinned above the navbar. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[80] h-[3px] origin-left gradient-gold"
      style={{ scaleX }}
      aria-hidden
    />
  );
}
