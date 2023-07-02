import Exercise, { IExercise } from '../models/Exercise';

export const dbInsertExercise = async (exercise: any) => {
  return await Exercise.findOrCreate(exercise);
};

export const dbGetExercises = async () => {
  return await Exercise.find();
};

export const dbGetExerciseById = async (id: string) => {
  return await Exercise.findById(id);
};

export const dbUpdateExerciseById = async (id: string, exercise: IExercise) => {
  return await Exercise.updateOne({ _id: id }, exercise, { upsert: true });
};

export const dbDeleteExerciseById = async (id: string) => {
  return await Exercise.deleteOne({ _id: id });
};
