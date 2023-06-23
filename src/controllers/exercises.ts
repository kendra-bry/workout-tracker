import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { getDb } from '../db/connect';

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

const getExerciseById = async (req: Request, res: Response) => {
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
    throw error;
  }
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
    throw error;
  }
};

const deleteExercise = async (req: Request, res: Response) => {
  try {
    await getDb()
      .db()
      .collection('exercises')
      .deleteOne({ _id: new ObjectId(req.params.id) });
    res.status(200).send();
  } catch (error) {
    throw error;
  }
};

export { getExercises, createExercise, getExerciseById, updateExerciseById, deleteExercise };
