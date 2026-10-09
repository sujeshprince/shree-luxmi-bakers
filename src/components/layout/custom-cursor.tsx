"use client";

import * as React from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { defer } from "@/lib/defer";

const SELECTOR =
  "a, button, [role='button'], input, textarea, select, label, [data-cursor-hover]";

/**
 * Elegant gold ring cursor — desktop / fine-pointer devices only.
 * Expands over interactive elements; native cursor is hidden while active
 * (text fields keep a native caret via the CSS rule in globals.css).
 */
export function CustomCursor() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 320, damping: 30, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 320, damping: 30, mass: 0.6 });

  React.useEffect(() => {
    if (reduced) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    defer(() => setEnabled(true));
    document.documentElement.classList.add("custom-cursor-active");

    const onMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      const target = event.target as HTMLElement | null;
      setExpanded(Boolean(target?.closest(SELECTOR)));
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [reduced, x, y]);

  if (!enabled) return null;

  return (
    <>
      {/* Trailing ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[90] rounded-full border border-gold/80"
        style={{ x: ringX, y: ringY }}
        animate={{
          width: expanded ? 56 : 30,
          height: expanded ? 56 : 30,
          marginLeft: expanded ? -28 : -15,
          marginTop: expanded ? -28 : -15,
          scale: pressed ? 0.85 : 1,
          opacity: expanded ? 1 : 0.75,
        }}
        transition={{ type: "spring", stiffness: 320, damping: 24 }}
      />
      {/* Leading dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[91] size-1.5 rounded-full bg-gold"
        style={{ x, y, marginLeft: -3, marginTop: -3 }}
        animate={{ opacity: expanded ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}
