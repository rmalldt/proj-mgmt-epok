import { useEffect, useState } from "react";

type BreakPoints = "sm" | "md" | "lg" | { customMediaQuery: string };

const getMediaQuery = (breakpoint: BreakPoints): string => {
  if (typeof breakpoint === "string") {
    switch (breakpoint) {
      case "sm":
        return "(max-width: 640px)";
      case "md":
        return "(min-width: 641px)";
      case "lg":
        return "(min-width: 1024px)";
      default:
        throw new Error(`Unknown breakpoint: ${breakpoint} `);
    }
  } else {
    return breakpoint.customMediaQuery;
  }
};

export const useMediaQueryMatch = (breakpoint: BreakPoints): boolean => {
  const [isMediaMatch, setIsMediaMatch] = useState<boolean>(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia(getMediaQuery(breakpoint)).matches,
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const mediaQueryList = window.matchMedia(getMediaQuery(breakpoint));
    setIsMediaMatch(mediaQueryList.matches);

    const handleMediaQueryChange = (e: MediaQueryListEvent): void => {
      setIsMediaMatch(e.matches);
    };

    mediaQueryList.addEventListener("change", handleMediaQueryChange);
    return () => {
      mediaQueryList.removeEventListener("change", handleMediaQueryChange);
    };
  }, [breakpoint]);

  return isMediaMatch;
};

export default useMediaQueryMatch;
