import React, { useState } from "react";
import Header from "@/components/Header";
import { Clock, Grid3X3, List, Table } from "lucide-react";

type Props = {
  activeTab: string;
  setActiveTab: (tabName: string) => void;
};

const ProjectHeader = ({ activeTab, setActiveTab }: Props) => {
  const [isModalNewProjectOpen, setIsModalNewProjectOpen] = useState(false);
  return (
    <div className="px-4 xl:px-6">
      {/* MODAL NEW PROJECT */}
      {/* HEADER */}
      <div className="pb-6 pt-6 lg:pb-4 lg:pt-8">
        <Header name="Product Design Development" />
      </div>
      {/* TABS */}
      <div className="flex flex-wrap-reverse gap-2 border-y border-gray-200 pb-[8px] pt-2 dark:border-stroke-dark md:items-center">
        <div className="flex flex-1 items-center gap-2 md:gap-4">
          <TabButton
            name="Board"
            icon={<Grid3X3 className="h-5 w-5" />}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <TabButton
            name="List"
            icon={<List className="h-5 w-5" />}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <TabButton
            name="Timeline"
            icon={<Clock className="h-5 w-5" />}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <TabButton
            name="Table"
            icon={<Table className="h-5 w-5" />}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
        </div>
      </div>
    </div>
  );
};

type TabButtonProps = {
  name: string;
  icon: React.ReactNode;
  activeTab: string;
  setActiveTab: (tabName: string) => void;
};

const TabButton = ({ name, icon, activeTab, setActiveTab }: TabButtonProps) => {
  const isActive = activeTab === name;

  return (
    <button
      className={`relative flex items-center gap-2 px-1 py-2 text-gray-500 after:absolute after:-bottom-[9px] after:left-0 after:h-[1px] after:w-full hover:text-blue-600 dark:text-neutral-500 dark:hover:text-white sm:px-2 lg:px-4 ${isActive ? "text-blue-600 after:bg-blue-600 dark:text-gray-50" : ""}`}
      onClick={() => setActiveTab(name)}
    >
      {icon}
      {name}
    </button>
  );
};

export default ProjectHeader;
