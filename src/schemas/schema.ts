import Joi from 'joi';

export const ExerciseTypeSchema = Joi.object({
  type: Joi.string().required()
});

export const ExerciseSchema = Joi.object({
  name: Joi.string().required(),
  exerciseType: ExerciseTypeSchema,
  startTime: Joi.date(),
  endTime: Joi.date(),
  duration: Joi.number(),
  reps: Joi.number().required(),
  sets: Joi.number().required(),
  weight: Joi.number().required(),
  distance: Joi.number().required(),
  notes: Joi.string(),
});

export const WorkoutSchema = Joi.object({
  startTime: Joi.date(),
  endTime: Joi.date(),
  exercises: Joi.array().items(ExerciseSchema)
});