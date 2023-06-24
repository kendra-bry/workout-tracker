// prettier-ignore
import {
  dbDeleteExerciseTypeById,
  dbGetExerciseTypeById,
  dbGetExerciseTypes,
  dbInsertExerciseType,
  dbUpdateExerciseTypeById
} from '../dataAccess/exerciseTypes';
import { NextFunction, Request, Response } from 'express';

const createExerciseType = async (req: Request, res: Response, next: NextFunction) => {
  /*
    #swagger.requestBody  = {
      description: 'Create an exercise type.',
      in: 'body',
      required: true,
      schema: { $ref: '#/definitions/ExerciseType'}
    }
  */
  try {
    const response = await dbInsertExerciseType(req.body);
    res.status(201).send(response);
  } catch (error) {
    next(error);
  }
};

const getExerciseTypes = async (req: Request, res: Response, next: NextFunction) => {
  /*
    #swagger.responses[200] = {
      schema: [{ $ref: '#/definitions/ExerciseType' }]
    }
  */
  try {
    const exerciseTypes = await dbGetExerciseTypes();
    res.status(200).send(exerciseTypes);
  } catch (error) {
    next(error);
  }
};

const getExerciseType = async (req: Request, res: Response, next: NextFunction) => {
  /*
    #swagger.responses[200] = {
      schema: { $ref: '#/definitions/ExerciseType' }
    }
  */
  try {
    const exerciseType = await dbGetExerciseTypeById(req.params.id);
    res.status(200).send(exerciseType);
  } catch (error) {
    next(error);
  }
};

const updateExerciseType = async (req: Request, res: Response, next: NextFunction) => {
  /*
    #swagger.requestBody  = {
      description: 'Update an exercise type.',
      in: 'body',
      required: true,
      schema: { $ref: '#/definitions/ExerciseType'}
    }
  */
  try {
    await dbUpdateExerciseTypeById(req.params.id, req.body);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

const deleteExerciseType = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await dbDeleteExerciseTypeById(req.params.id);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

// prettier-ignore
export {
  createExerciseType,
  deleteExerciseType,
  getExerciseType,
  getExerciseTypes,
  updateExerciseType,
};
