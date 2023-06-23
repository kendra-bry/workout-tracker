import { Request, Response } from 'express';
import { getDb } from '../db/connect';

const getExercises = async (req: Request, res: Response) => {
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
    throw error;
  }
};

const createExercise = async (req: Request, res: Response) => {
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
    throw error;
  }
};

export { getExercises, createExercise };
