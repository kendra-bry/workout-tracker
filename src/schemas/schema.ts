import Joi from 'joi';

// export const ExerciseTypeSchema = Joi.object({
//   type: Joi.string().required(),
// });

export const ExerciseSchema = Joi.object({
  name: Joi.string().required(),
  // exerciseType: ExerciseTypeSchema,
  startTime: Joi.date().optional().allow(''),
  endTime: Joi.date().optional().allow(''),
  duration: Joi.string().optional().allow(''),
  reps: Joi.number().optional().allow(''),
  sets: Joi.number().optional().allow(''),
  weight: Joi.string().optional().allow(''),
  distance: Joi.string().optional().allow(''),
  notes: Joi.string().optional().allow(''),
});

export const WorkoutSchema = Joi.object({
  startTime: Joi.date().optional().allow(''),
  endTime: Joi.date().optional().allow(''),
  exercises: Joi.array()
    .items(Joi.object({ exercise_id: Joi.string().optional().allow('') }))
    .optional()
    .allow(''),
});
