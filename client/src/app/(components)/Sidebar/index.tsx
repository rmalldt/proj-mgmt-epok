"use client";

import React, { useState } from "react";
import { Lock, X } from "lucide-react";
import Image from "next/image";

const Sidebar = () => {
  const [showProjects, setShowProjects] = useState(true);
  const [showPriority, setShowPriority] = useState(true);

  return (
    <div className="fixed z-40 flex h-full w-64 flex-col overflow-y-auto bg-white shadow-xl transition-all duration-300 dark:bg-black">
      <div className="flex h-full w-full flex-col justify-start">
        {/* Logo */}
        <div className="z-50 flex min-h-[56px] w-64 items-center justify-between bg-white px-6 pt-3 dark:bg-black">
          <div className="text-xl font-bold text-gray-800 dark:text-white">
            EPOK
          </div>
          <div className="text-xl font-bold text-gray-500 hover:text-gray-400 dark:text-white">
            <X />
          </div>
        </div>
        {/* Team */}
        <div className="flex items-center gap-5 border-y-[1.5px] border-gray-200 px-8 py-4 dark:border-gray-700">
          <Image src="/logo.png" alt="Logo" width={50} height={50} />
          <div>
            <h3 className="text-md font-bold uppercase tracking-wide dark:text-gray-200">
              Epok Team
            </h3>
            <div className="mt-1 flex items-start gap-2">
              <Lock className="mt-[0.1rem] h-3 w-3 capitalize text-gray-500 dark:text-gray-400" />
              <p className="text-xs text-gray-500">Private</p>
            </div>
          </div>
        </div>
        {/* Navbar Links */}
      </div>
    </div>
  );
};

export default Sidebar;
