import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get the task associated with the projectId
export const getTasks = async (req: Request, res: Response): Promise<void> => {
  const { projectId } = req.query; // query param
  try {
    const tasks = await prisma.task.findMany({
      where: {
        projectId: Number(projectId),
      },
      include: {
        author: true,
        assignee: true,
        comments: true,
        attachments: true,
      },
    });
    res.json(tasks);
  } catch (err: any) {
    res
      .status(500)
      .json({ message: `'Error retrieving tasks: ${err.message}` });
  }
};

export const createTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    title,
    description,
    status,
    priority,
    tags,
    startDate,
    dueDate,
    points,
    projectId,
    authorUserId,
    assignedUserId,
  } = req.body;
  try {
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        status,
        priority,
        tags,
        startDate,
        dueDate,
        points,
        projectId,
        authorUserId,
        assignedUserId,
      },
    });
    res.status(201).json(newTask); // return created projects with success status
  } catch (err: any) {
    res.status(500).json({ message: `Error creating task: ${err.message}` });
  }
};

export const updateTasksStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { taskId } = req.params; // params
  const { status } = req.body;
  try {
    const updatedTask = await prisma.task.update({
      where: { id: Number(taskId) },
      data: { status: status },
    });
    res.json(updatedTask);
  } catch (err: any) {
    res.status(500).json({ message: `'Error updating tasks: ${err.message}` });
  }
};

export const getUserTasks = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.params;
  try {
    const tasks = await prisma.task.findMany({
      where: {
        OR: [
          { authorUserId: Number(userId) },
          { assignedUserId: Number(userId) },
        ],
      },
      include: {
        author: true,
        assignee: true,
      },
    });

    res.json(tasks);
  } catch (err: any) {
    res
      .status(500)
      .json({ message: `'Error retrieving users tasks: ${err.message}` });
  }
};
