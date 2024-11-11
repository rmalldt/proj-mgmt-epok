import React, { useEffect, useRef } from "react";

const useOutsideClick = (handler: () => void) => {
  const ref = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleOutsideClick = ({ target }: MouseEvent) => {
      console.log(ref);
      if (ref.current && !ref.current.contains(target as Node)) {
        handler();
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [handler]);

  return ref;
};

export default useOutsideClick;
