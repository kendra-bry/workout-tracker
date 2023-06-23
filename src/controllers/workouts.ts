import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { getDb } from '../db/connect';

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

const getWorkoutById = async (req: Request, res: Response) => {
  /*
    #swagger.responses[200] = {
      schema: { $ref: '#/definitions/Workout' }
    }
  */
  try {
    const exerciseType = await getDb()
      .db()
      .collection('workouts')
      .findOne({ _id: new ObjectId(req.params.id) });
    res.status(200).send(exerciseType);
  } catch (error) {
    throw error;
  }
};

const updateWorkout = async (req: Request, res: Response) => {
  /*
    #swagger.requestBody  = {
      description: 'Update an exercise type.',
      in: 'body',
      required: true,
      schema: { $ref: '#/definitions/Workout'}
    }
  */
  try {
    const response = await getDb()
      .db()
      .collection('workouts')
      .updateOne(
        {
          _id: new ObjectId(req.params.id),
        },
        { $set: req.body },
        { upsert: true }
      );
    res.status(204).send(response);
  } catch (error) {
    throw error;
  }
};

const deleteWorkout = async (req: Request, res: Response) => {
  try {
    await getDb()
      .db()
      .collection('workouts')
      .deleteOne({ _id: new ObjectId(req.params.id) });
    res.status(200).send();
  } catch (error) {
    throw error;
  }
};


export { getWorkouts, createWorkout, getWorkoutById, updateWorkout, deleteWorkout };
