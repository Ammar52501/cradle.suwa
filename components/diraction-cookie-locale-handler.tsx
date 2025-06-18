import { useEffect, memo, useRef } from "react";
import { useRouter } from "next/router";
import { LOCALE_COOKIE } from "@/lib/constant";
const DirectionHandler = memo(({ dir }: { dir: string }) => {
  const { locale } = useRouter();
  const lastLocale = useRef(locale);
  useEffect(() => {
    if (typeof window !== "undefined" && dir)
      document.documentElement.dir = dir;
  }, [dir]);

  useEffect(() => {
    if (lastLocale.current !== locale && typeof window !== "undefined") {
      const expires = new Date(
        Date.now() + 365 * 24 * 60 * 60 * 1000
      ).toUTCString();
      document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; expires=${expires}; SameSite=Strict;${
        process.env.NODE_ENV === "production" ? " Secure" : ""
      }`;
      lastLocale.current = locale;
    }
  }, [locale]);
  return null;
});

DirectionHandler.displayName = "DirectionHandler";

export default DirectionHandler;
