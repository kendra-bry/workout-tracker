import { ObjectId } from 'mongodb';
import { getDb } from '../db/connect';
import { dbGetExerciseById } from './exercises';

const WORKOUTS = 'workouts';

export const dbInsertWorkout = async (workout: any) => {
  return await getDb().db().collection(WORKOUTS).insertOne(workout);
};

export const dbGetWorkouts = async () => {
  const data = await getDb().db().collection(WORKOUTS).find();
  let workouts = await data.toArray();
  return workouts;
};

export const dbGetWorkoutById = async (id: string) => {
  const workout = await getDb()
    .db()
    .collection(WORKOUTS)
    .findOne({ _id: new ObjectId(id) });

  if (workout && workout.exercises?.length > 0) {
    const exercises = workout.exercises;
    const fetchedExercises = [];
    for (let exercise of exercises) {
      let ex = await dbGetExerciseById(exercise.exercise_id);
      if (ex) {
        fetchedExercises.push(ex);
      }
    }
    workout.exercises = fetchedExercises;
  }

  return workout;
};

export const dbUpdateWorkoutById = async (id: string, workout: any) => {
  return await getDb()
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
  return await getDb()
    .db()
    .collection(WORKOUTS)
    .deleteOne({ _id: new ObjectId(id) });
};
