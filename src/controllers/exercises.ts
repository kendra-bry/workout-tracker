// prettier-ignore
import {
  dbDeleteExerciseById,
  dbGetExercises,
  dbGetExerciseById,
  dbInsertExercise,
  dbUpdateExerciseById,
} from '../dataAccess/exercises';
import { Request, Response } from 'express';

const createExercise = async (req: Request, res: Response) => {
  /*
    #swagger.requestBody  = {
      description: 'Start an exercise.',
      in: 'body',
      required: true,
      schema: { $ref: '#/definitions/Exercise'}
    }
  */
  req.body.startTime = new Date();
  const exercise = await dbInsertExercise(req.body);
  res.status(201).send(exercise);
};

const getExercises = async (req: Request, res: Response) => {
  /*
    #swagger.responses[200] = {
      schema: [{ $ref: '#/definitions/Exercise' }]
    }
  */
  const exercises = await dbGetExercises();
  res.status(200).send(exercises);
};

const getExerciseById = async (req: Request, res: Response) => {
  /*
    #swagger.responses[200] = {
      schema: { $ref: '#/definitions/Exercise' }
    }
  */
  const exercise = await dbGetExerciseById(req.params.id);
  res.status(200).send(exercise);
};

const updateExerciseById = async (req: Request, res: Response) => {
  /*
    #swagger.requestBody  = {
      description: 'Update an exercise.',
      in: 'body',
      required: true,
      schema: { $ref: '#/definitions/Exercise'}
    }
  */
  await dbUpdateExerciseById(req.params.id, req.body);
  res.status(204).send();
};

const deleteExercise = async (req: Request, res: Response) => {
  await dbDeleteExerciseById(req.params.id);
  res.status(200).send();
};

// prettier-ignore
export {
  createExercise,
  deleteExercise,
  getExercises,
  getExerciseById,
  updateExerciseById,
};
