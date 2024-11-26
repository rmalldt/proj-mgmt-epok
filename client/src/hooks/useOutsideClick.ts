import React, { useEffect, useRef } from "react";

const useOutsideClick = <T extends HTMLElement>(
  handler: () => void,
  listenOnCapture: boolean = false,
) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClick = ({ target }: MouseEvent) => {
      if (ref.current && !ref.current.contains(target as Node)) {
        handler();
      }
    };

    document.addEventListener("click", handleClick, listenOnCapture);
    return () => document.removeEventListener("click", handleClick);
  }, [handler, listenOnCapture]);

  return ref;
};

export default useOutsideClick;
