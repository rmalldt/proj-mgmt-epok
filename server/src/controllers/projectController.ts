import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

/* Connect to database */
const prisma = new PrismaClient();

export const getProjects = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const projects = await prisma.project.findMany();
    res.json(projects); // return projects list JSON in response
  } catch (err: any) {
    res
      .status(500)
      .json({ message: `'Error retrieving projects: ${err.message}` });
  }
};

export const createProject = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { name, description, startDate, endDate } = req.body;
  try {
    const newProject = await prisma.project.create({
      data: {
        name,
        description,
        startDate,
        endDate,
      },
    });
    res.status(201).json(newProject); // return created projects with success status
  } catch (err: any) {
    res.status(500).json({ message: `Error creating project: ${err.message}` });
  }
};
