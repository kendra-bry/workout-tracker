import { ObjectId } from 'mongodb';
import { getDb } from '../db/connect';

const EXERCISES = 'exercises';

export const dbInsertExercise = async (exercise: any) => {
  return await getDb().db().collection(EXERCISES).insertOne(exercise);
};

export const dbGetExercises = async () => {
  const data = await getDb().db().collection(EXERCISES).find();
  let result = await data.toArray();
  return result;
};

export const dbGetExerciseById = async (id: string) => {
  return await getDb()
    .db()
    .collection(EXERCISES)
    .findOne({ _id: new ObjectId(id) });
};

export const dbUpdateExerciseById = async (id: string, exercise: any) => {
  return getDb()
    .db()
    .collection(EXERCISES)
    .updateOne(
      {
        _id: new ObjectId(id),
      },
      { $set: exercise },
      { upsert: true }
    );
}

export const dbDeleteExerciseById = async (id: string) => {
  getDb()
    .db()
    .collection(EXERCISES)
    .deleteOne({ _id: new ObjectId(id) });
}