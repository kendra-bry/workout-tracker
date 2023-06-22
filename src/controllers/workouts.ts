import { Request, Response } from 'express';

const getWorkouts = (req: Request, res: Response) => {
  res.send('Get Workouts');
};

const createWorkout = (req: Request, res: Response) => {
  res.send('Creating Workout');
};

export { getWorkouts, createWorkout };
