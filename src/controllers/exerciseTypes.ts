import { NextFunction, Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { getDb } from '../db/connect';

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
    const response = await getDb().db().collection('exerciseTypes').insertOne(req.body);
    res.status(201).send(response);
  } catch (error) {
    // Error will be handled by the universal error handler.
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
    const data = await getDb().db().collection('exerciseTypes').find();
    let result = await data.toArray();
    res.status(200).send(result);
  } catch (error) {
    // Error will be handled by the universal error handler.
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
    const exerciseType = await getDb()
      .db()
      .collection('exerciseTypes')
      .findOne({ _id: new ObjectId(req.params.id) });
    res.status(200).send(exerciseType);
  } catch (error) {
    // Error will be handled by the universal error handler.
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
    const response = await getDb()
      .db()
      .collection('exerciseTypes')
      .updateOne(
        {
          _id: new ObjectId(req.params.id),
        },
        { $set: req.body },
        { upsert: true }
      );
    res.status(204).send(response);
  } catch (error) {
    // Error will be handled by the universal error handler.
    next(error);
  }
};

const deleteExerciseType = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await getDb()
      .db()
      .collection('exerciseTypes')
      .deleteOne({ _id: new ObjectId(req.params.id) });
    res.status(200).send();
  } catch (error) {
    // Error will be handled by the universal error handler.
    next(error);
  }
};

export { getExerciseTypes, createExerciseType, getExerciseType, updateExerciseType, deleteExerciseType };
