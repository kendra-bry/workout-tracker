import { ObjectId } from 'mongodb';
import { getDb } from '../db/connect';

const WORKOUTS = 'workouts';

export const dbInsertWorkout = async (workout: any) => {
  return await getDb().db().collection(WORKOUTS).insertOne(workout);
};

export const dbGetWorkouts = async () => {
  const data = await getDb().db().collection(WORKOUTS).find();
  let result = await data.toArray();
  return result;
};

export const dbGetWorkoutById = async (id: string) => {
  return await getDb()
    .db()
    .collection(WORKOUTS)
    .findOne({ _id: new ObjectId(id) });
};

export const dbUpdateWorkoutById = async (id: string, workout: any) => {
  return getDb()
    .db()
    .collection(WORKOUTS)
    .updateOne(
      {
        _id: new ObjectId(id),
      },
      { $set: workout },
      { upsert: true }
    );
};

export const dbDeleteWorkoutById = async (id: string) => {
  getDb()
    .db()
    .collection(WORKOUTS)
    .deleteOne({ _id: new ObjectId(id) });
};
