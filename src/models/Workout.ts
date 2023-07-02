import mongoose, { Schema, Document, Model } from 'mongoose';
import { IExercise } from './Exercise';

export interface IWorkout extends Document {
  startTime: Date;
  endTime: Date;
  exercises: IExercise[];
}

export interface IWorkoutModel extends Model<IWorkout> {
  findOrCreate: (user: IWorkout) => Promise<IWorkout>;
}

const WorkoutSchema: Schema = new Schema({
  startTime: {
    type: Date,
    default: Date.now,
  },
  endTime: {
    type: Date,
  },
  exercises: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exercise',
    },
  ],
});

WorkoutSchema.statics.findOrCreate = async function (workout: IWorkout) {
  const existingWorkout = await this.findOne({ startTime: workout.startTime });
  if (existingWorkout) {
    return existingWorkout;
  } else {
    return this.create(workout);
  }
};

export default mongoose.model<IWorkout, IWorkoutModel>('Workout', WorkoutSchema);
