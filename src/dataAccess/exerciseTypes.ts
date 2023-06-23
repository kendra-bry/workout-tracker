import { ObjectId } from 'mongodb';
import { getDb } from '../db/connect';

const EXERCISE_TYPES = 'exerciseTypes';

export const dbInsertExerciseType = async (type: any) => {
  return await getDb().db().collection(EXERCISE_TYPES).insertOne({ type });
};

export const dbGetExerciseTypes = async () => {
  const data = await getDb().db().collection(EXERCISE_TYPES).find();
  let result = await data.toArray();
  return result;
};

export const dbGetExerciseTypeById = async (id: string) => {
  return await getDb()
    .db()
    .collection(EXERCISE_TYPES)
    .findOne({ _id: new ObjectId(id) });
};

export const dbGetExerciseTypeByName = async (name: string) => {
  return await getDb().db().collection(EXERCISE_TYPES).findOne({ name: name.toUpperCase() });
};

export const dbUpdateExerciseTypeById = async (id: string, type: any) => {
  return getDb()
    .db()
    .collection(EXERCISE_TYPES)
    .updateOne(
      {
        _id: new ObjectId(id),
      },
      { $set: type },
      { upsert: true }
    );
};

export const dbDeleteExerciseTypeById = async (id: string) => {
  getDb()
    .db()
    .collection(EXERCISE_TYPES)
    .deleteOne({ _id: new ObjectId(id) });
};
