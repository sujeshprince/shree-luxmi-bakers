"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { defer } from "@/lib/defer";

const KEY = "slb:preloader-seen";

/**
 * Elegant first-visit preloader: brand name in Playfair with a gold
 * shimmer sweep. Shown once per browser session, ~1.6s max.
 */
export function Preloader() {
  const [visible, setVisible] = React.useState(true);
  const reduced = useReducedMotion();

  React.useEffect(() => {
    if (window.sessionStorage.getItem(KEY)) {
      defer(() => setVisible(false));
      return;
    }
    window.sessionStorage.setItem(KEY, "1");
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
    }, 1600);
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence onExitComplete={() => (document.body.style.overflow = "")}>
      {visible ? (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[95] flex flex-col items-center justify-center gradient-brown surface-lattice"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
          aria-hidden
        >
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="px-6 text-center font-heading text-4xl font-semibold tracking-[0.14em] text-cream sm:text-6xl"
          >
            {siteConfig.shortName.toUpperCase()}
          </motion.p>

          <motion.p
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-3 text-center text-[0.7rem] font-medium tracking-[0.5em] text-gold gold-shimmer sm:text-sm"
          >
            BAKERS &amp; SWEETS
          </motion.p>

          <motion.div
            className="mt-9 h-px w-44 overflow-hidden bg-cream/15 sm:w-60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="h-full w-full gradient-gold"
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 1.1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
