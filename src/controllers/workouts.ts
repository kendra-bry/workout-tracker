import { Request, Response } from 'express';
import { getDb } from '../db/connect';

const getWorkouts = async (req: Request, res: Response) => {
  /*
    #swagger.responses[200] = {
      schema: [{ $ref: '#/definitions/Workout' }]
    }
  */
  try {
    const data = await getDb().db().collection('workouts').find();
    let result = await data.toArray();
    res.status(200).send(result);
  } catch (error) {
    throw error;
  }
};

const createWorkout = async (req: Request, res: Response) => {
  /*
    #swagger.requestBody  = {
      description: 'Start a workout.',
      in: 'body',
      required: true,
      schema: { $ref: '#/definitions/Workout'}
    }
  */
  try {
    const response = await getDb().db().collection('workouts').insertOne(req.body);
    res.status(201).send(response);
  } catch (error) {
    throw error;
  }
};

export { getWorkouts, createWorkout };
