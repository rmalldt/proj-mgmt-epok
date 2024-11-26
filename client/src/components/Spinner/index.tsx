import Image from "next/image";
import React from "react";

function Spinner() {
  return (
    <div className="flex h-lvh w-full items-center justify-center bg-white dark:bg-dark-bg">
      <div className="fade animate-fadeout relative bg-slate-100">
        <Image
          src="https://evok-s3-images.s3.us-east-1.amazonaws.com/logo.png"
          alt="Logo"
          width={100}
          height={100}
          priority
        />
        <div className="loader animate-fadeout absolute left-[50%] mt-20 translate-x-[-50%]"></div>
      </div>
    </div>
  );
}

export default Spinner;
