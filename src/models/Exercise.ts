import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IExercise extends Document {
  name: string;
  startTime: Date;
  endTime: Date;
  duration: string;
  reps: string;
  sets: Number;
  weight: string;
  distance: string;
  notes: string;
}

export interface IExerciseModel extends Model<IExercise> {
  findOrCreate: (exercise: IExercise) => Promise<IExercise>;
}

const ExerciseSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
    default: Date.now,
  },
  endTime: {
    type: Date,
  },
  duration: {
    type: String,
  },
  reps: {
    type: String,
  },
  sets: {
    type: Number,
  },
  weight: {
    type: String,
  },
  distance: {
    type: String,
  },
  notes: {
    type: String,
  },
});

ExerciseSchema.statics.findOrCreate = async function (exercise: IExercise) {
  const existingExercise = await this.findOne({ name: exercise.name });
  if (existingExercise) {
    return existingExercise;
  } else {
    return this.create(exercise);
  }
};

export default mongoose.model<IExercise, IExerciseModel>('Exercise', ExerciseSchema);
