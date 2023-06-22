import { Request, Response } from 'express';

const getExercises = (req: Request, res: Response) => {
  res.send('Get exercises');
};

const createExercise = (req: Request, res: Response) => {
  res.send('Creating exercise');
};

export { getExercises, createExercise };
