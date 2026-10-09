"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "cn";

const EASE = [0.22, 1, 0.36, 1] as const;

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Entrance distance in px. */
  y?: number;
  delay?: number;
  duration?: number;
  once?: boolean;
}

/** Fade-up scroll reveal (disabled automatically for reduced-motion users). */
export function Reveal({
  children,
  className,
  y = 28,
  delay = 0,
  duration = 0.7,
  once = true,
}: RevealProps) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Container that staggers its <RevealItem> children on scroll. */
export function RevealGroup({
  children,
  className,
  stagger = 0.09,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  y = 24,
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
}) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  );
}

/** Wraps children in a subtle hover glow (desktop). */
export function GlowCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_-24px_rgba(212,175,55,0.55)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
