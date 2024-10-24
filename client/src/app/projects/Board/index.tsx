import { useGetTasksQuery, useUpdateTaskStatusMutation } from "@/state/api";
import React from "react";

type BoardProps = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const taskStatus = ["To Do", "WorkInProgress", "Under Review", "Completed"];

const Board = ({ id, setIsModalNewTaskOpen }: BoardProps) => {
  // Redux useQuery returns Objects
  const {
    data: tasks,
    isLoading,
    error,
  } = useGetTasksQuery({ projectId: Number(id) });

  console.log(tasks);

  // Redux useMutation returns array
  const [updateTaskStatus] = useUpdateTaskStatusMutation();

  const moveTask = (taskId: number, toStatus: string) => {
    updateTaskStatus({ taskId, status: toStatus });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occured while fetching tasks</div>;

  return <div>BoardView</div>;
};

export default Board;
