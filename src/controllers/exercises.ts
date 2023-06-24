// prettier-ignore
import {
  dbDeleteExerciseById,
  dbGetExercises,
  dbGetExerciseById,
  dbInsertExercise,
  dbUpdateExerciseById,
} from '../dataAccess/exercises';
import { NextFunction, Request, Response } from 'express';

const createExercise = async (req: Request, res: Response, next: NextFunction) => {
  /*
    #swagger.requestBody  = {
      description: 'Start an exercise.',
      in: 'body',
      required: true,
      schema: { $ref: '#/definitions/Exercise'}
    }
  */
  try {
    req.body.startTime = new Date();
    const exercise = await dbInsertExercise(req.body);

    res.status(201).send(exercise);
  } catch (error) {
    next(error);
  }
};

const getExercises = async (req: Request, res: Response, next: NextFunction) => {
  /*
    #swagger.responses[200] = {
      schema: [{ $ref: '#/definitions/Exercise' }]
    }
  */
  try {
    const exercises = await dbGetExercises();
    res.status(200).send(exercises);
  } catch (error) {
    next(error);
  }
};

const getExerciseById = async (req: Request, res: Response, next: NextFunction) => {
  /*
    #swagger.responses[200] = {
      schema: { $ref: '#/definitions/Exercise' }
    }
  */
  try {
    const exercise = await dbGetExerciseById(req.params.id);
    res.status(200).send(exercise);
  } catch (error) {
    next(error);
  }
};

const updateExerciseById = async (req: Request, res: Response, next: NextFunction) => {
  /*
    #swagger.requestBody  = {
      description: 'Update an exercise.',
      in: 'body',
      required: true,
      schema: { $ref: '#/definitions/Exercise'}
    }
  */
  try {
    await dbUpdateExerciseById(req.params.id, req.body);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const deleteExercise = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await dbDeleteExerciseById(req.params.id);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

// prettier-ignore
export {
  createExercise,
  deleteExercise,
  getExercises,
  getExerciseById,
  updateExerciseById,
};
