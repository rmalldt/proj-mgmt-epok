"use client";

import React, { useState } from "react";
import ProjectHeader from "@/app/projects/ProjectHeader";
import BoardView from "@/app/projects/BoardView";
import ListView from "@/app/projects/ListView";
import TimelineView from "@/app/projects/TimlineView";
import TableView from "../TableView";
import ModalNewTask from "@/components/ModalNewTask";

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
      <ModalNewTask
        isOpen={isModalNewTaskOpen}
        onClose={() => setIsNewModelTaskOpen(false)}
        id={id}
      />
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "Board" && (
        <BoardView id={id} setIsModalNewTaskOpen={setIsNewModelTaskOpen} />
      )}
      {activeTab === "List" && (
        <ListView id={id} setIsModalNewTaskOpen={setIsNewModelTaskOpen} />
      )}
      {activeTab === "Table" && (
        <TableView id={id} setIsModalNewTaskOpen={setIsNewModelTaskOpen} />
      )}
      {activeTab === "Timeline" && (
        <TimelineView id={id} setIsModalNewTaskOpen={setIsNewModelTaskOpen} />
      )}
    </div>
  );
};

export default Project;
