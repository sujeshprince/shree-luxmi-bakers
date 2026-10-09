"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

/** Appears after meaningful scroll depth; smooth-scrolls back to top. */
export function BackToTop() {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show ? (
        <motion.button
          key="back-to-top"
          type="button"
          aria-label="Back to top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          initial={{ opacity: 0, scale: 0.6, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 12 }}
          whileHover={{ y: -3 }}
          className="fixed right-4 bottom-24 z-40 flex size-11 items-center justify-center rounded-full border border-gold/50 bg-card/95 text-gold-deep shadow-lg backdrop-blur transition-colors hover:bg-gold hover:text-brown-deep md:right-6 md:bottom-28"
        >
          <ArrowUp className="size-5" />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
