// prettier-ignore
import {
  dbDeleteWorkoutById,
  dbGetWorkoutById,
  dbGetWorkouts,
  dbInsertWorkout,
  dbUpdateWorkoutById
} from '../dataAccess/workouts';
import { NextFunction, Request, Response } from 'express';

const createWorkout = async (req: Request, res: Response, next: NextFunction) => {
  /*
    #swagger.requestBody  = {
      description: 'Start a workout.',
      in: 'body',
      required: true,
      schema: { $ref: '#/definitions/Workout'}
    }
  */
  try {
    req.body.startDate = new Date();
    const response = await dbInsertWorkout(req.body);
    res.status(201).send(response);
  } catch (error) {
    next(error);
  }
};

const getWorkouts = async (req: Request, res: Response, next: NextFunction) => {
  /*
    #swagger.responses[200] = {
      schema: [{ $ref: '#/definitions/Workout' }]
    }
  */
  try {
    const workouts = await dbGetWorkouts();
    res.status(200).send(workouts);
  } catch (error) {
    next(error);
  }
};

const getWorkoutById = async (req: Request, res: Response, next: NextFunction) => {
  /*
    #swagger.responses[200] = {
      schema: { $ref: '#/definitions/Workout' }
    }
  */
  try {
    const workout = await dbGetWorkoutById(req.params.id);
    res.status(200).send(workout);
  } catch (error) {
    next(error);
  }
};

const updateWorkout = async (req: Request, res: Response, next: NextFunction) => {
  /*
    #swagger.requestBody  = {
      description: 'Update an exercise type.',
      in: 'body',
      required: true,
      schema: { $ref: '#/definitions/Workout'}
    }
  */
  try {
    await dbUpdateWorkoutById(req.params.id, req.body);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const deleteWorkout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await dbDeleteWorkoutById(req.params.id);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

// prettier-ignore
export {
  createWorkout,
  deleteWorkout,
  getWorkouts,
  getWorkoutById,
  updateWorkout,
};
