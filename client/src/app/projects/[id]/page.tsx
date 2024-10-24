"use client";

import React, { useState } from "react";
import ProjectHeader from "@/app/projects/ProjectHeader";
import Board from "@/app/projects/Board";

type Props = {
  params: { id: string };
};

// Client component receives params prop by default
const Project = ({ params }: Props) => {
  const { id } = params;

  // ProjectHeader states
  const [activeTab, setActiveTab] = useState("Board");
  const [isModalNewTaskOpen, setIsNewModelTaskOpen] = useState(false);

  return (
    <div>
      {/* Modal New Task */}
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "Board" && (
        <Board id={id} setIsModalNewTaskOpen={setIsNewModelTaskOpen} />
      )}
    </div>
  );
};

export default Project;
