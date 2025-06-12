"use client";
import { memo, useEffect } from "react";
function isOverflowHidden() {
  const body = document.body;
  return (
    body.getAttribute("data-scroll-locked") ||
    getComputedStyle(body).overflow === "hidden"
  );
}
const DataScrollLocked = memo(() => {
  useEffect(() => {
    async function importLenis() {
      const Lenis = (await import("lenis")).default;
      let lenis = new Lenis();
      async function raf(time) {
        if (isOverflowHidden()) {
          lenis.destroy();
          await new Promise((res) => {
            const interval = setInterval(() => {
              if (!isOverflowHidden()) {
                clearInterval(interval);
                res("");
              }
            }, 100);
          });
          lenis = new Lenis();
        }
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }
    importLenis();
  }, []);

  return null;
});

DataScrollLocked.displayName = "DataScrollLocked";

export default DataScrollLocked;
