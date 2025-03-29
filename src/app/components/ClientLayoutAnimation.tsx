"use client";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); // Get current route

  return (
    <AnimatePresence mode="wait">
      <motion.div
         key={pathname}
        initial={{ opacity: 0, x: "100vw" }} // Neue Seite ist unsichtbar
        animate={{ opacity: 1, x: 0, transition: {  duration: 0.7 } }} // Verzögerung von 0.5s bevor die neue Seite sichtbar wird
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
