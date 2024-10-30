import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all Users
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err: any) {
    res
      .status(500)
      .json({ message: `'Error retrieving users: ${err.message}` });
  }
};

// Get a User with provided Cognito ID
export const getUser = async (req: Request, res: Response): Promise<void> => {
  const { cognitoId } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: {
        cognitoId: cognitoId,
      },
    });
    console.log('GET_USER', cognitoId, user);
    res.json(user);
  } catch (err: any) {
    res.status(500).json({ message: `'Error retrieving user: ${err.message}` });
  }
};

// This function will be triggered when a new user signs up
export const postUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      username,
      cognitoId,
      profilePictureUrl = 'p10.jpeg',
      teamId = 1,
    } = req.body;

    const newUser = await prisma.user.create({
      data: {
        username,
        cognitoId,
        profilePictureUrl,
        teamId,
      },
    });
    console.log('CREATE_USER', cognitoId, username);
    res.json({
      message: 'User created successfully',
      newUser,
    });
  } catch (err: any) {
    res
      .status(500)
      .json({ message: `'Error creating new user: ${err.message}` });
  }
};
