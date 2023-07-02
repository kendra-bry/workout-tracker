import Workout from '../models/Workout';

export const dbInsertWorkout = async (workout: any) => {
  return await Workout.findOrCreate(workout);
};

export const dbGetWorkouts = async () => {
  return await Workout.find().populate('exercises');
};

export const dbGetWorkoutById = async (id: string) => {
  return await Workout.findById(id).populate('exercises');
};

export const dbUpdateWorkoutById = async (id: string, workout: any) => {
  return await Workout.updateOne({ _id: id }, workout, { upsert: true });
};

export const dbDeleteWorkoutById = async (id: string) => {
  return await Workout.deleteOne({ _id: id });
};
