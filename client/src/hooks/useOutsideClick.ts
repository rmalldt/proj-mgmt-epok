import React, { useEffect, useRef } from "react";

const useOutsideClick = (
  handler: () => void,
  listenOnCapture: boolean = false,
) => {
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleClick = ({ target }: MouseEvent) => {
      console.log(ref);
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
