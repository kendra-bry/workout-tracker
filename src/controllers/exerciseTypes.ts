import { Request, Response } from 'express';
import { getDb } from '../db/connect';

const getExerciseTypes = async (req: Request, res: Response) => {
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
    throw error;
  }
};

const createExerciseType = async (req: Request, res: Response) => {
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
    throw error;
  }
};

export { getExerciseTypes, createExerciseType };
