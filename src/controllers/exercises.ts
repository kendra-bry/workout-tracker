import { NextFunction, Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { getDb } from '../db/connect';

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
    const response = await getDb().db().collection('exercises').insertOne(req.body);
    res.status(201).send(response);
  } catch (error) {
    // Error will be handled by the universal error handler.
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
    const data = await getDb().db().collection('exercises').find();
    let result = await data.toArray();
    res.status(200).send(result);
  } catch (error) {
    // Error will be handled by the universal error handler.
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
    const exercise = await getDb()
      .db()
      .collection('exercises')
      .findOne({ _id: new ObjectId(req.params.id) });
    res.status(200).send(exercise);
  } catch (error) {
    // Error will be handled by the universal error handler.
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
    await getDb()
      .db()
      .collection('exercises')
      .updateOne(
        {
          _id: new ObjectId(req.params.id),
        },
        { $set: req.body },
        { upsert: true }
      );
    res.status(204).send();
  } catch (error) {
    // Error will be handled by the universal error handler.
  }
};

const deleteExercise = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await getDb()
      .db()
      .collection('exercises')
      .deleteOne({ _id: new ObjectId(req.params.id) });
    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

export { getExercises, createExercise, getExerciseById, updateExerciseById, deleteExercise };
