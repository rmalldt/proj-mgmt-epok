import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// https://www.prisma.io/docs/orm/reference/prisma-client-reference#return-all-users-where-name-does-not-equal-eleanor-including-users-where-name-is-null
export const getSearch = async (req: Request, res: Response): Promise<void> => {
  const { query } = req.query; // query param
  try {
    const tasks = await prisma.task.findMany({
      where: {
        OR: [
          { title: { contains: query as string, mode: 'insensitive' } },
          { description: { contains: query as string, mode: 'insensitive' } },
          { status: { contains: query as string, mode: 'insensitive' } },
          { tags: { contains: query as string, mode: 'insensitive' } },
          { priority: { contains: query as string, mode: 'insensitive' } },
        ],
      },
    });

    const projects = await prisma.project.findMany({
      where: {
        OR: [
          { name: { contains: query as string, mode: 'insensitive' } },
          { description: { contains: query as string, mode: 'insensitive' } },
        ],
      },
    });

    const users = await prisma.user.findMany({
      where: {
        OR: [{ username: { contains: query as string, mode: 'insensitive' } }],
      },
    });
    console.log(tasks, projects, users);
    res.json({ tasks, projects, users });
  } catch (err: any) {
    res
      .status(500)
      .json({ message: `'Error performing search: ${err.message}` });
  }
};
