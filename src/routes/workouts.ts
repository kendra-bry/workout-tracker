// prettier-ignore
import {
  createWorkout,
  deleteWorkout,
  getWorkouts,
  getWorkoutById,
  updateWorkout,
} from '../controllers/workouts';
import { Router } from 'express';
import { WorkoutSchema } from '../schemas/schema';
import { handleErrors, validate } from '../middleware';

const router = Router();

router.get('/', handleErrors(getWorkouts));
router.get('/:id', handleErrors(getWorkoutById));
router.post('/', validate(WorkoutSchema), handleErrors(createWorkout));
router.put('/:id', validate(WorkoutSchema), handleErrors(updateWorkout));
router.delete('/:id', handleErrors(deleteWorkout));

// Swagger-autogen breaks when my controllers are wrapped in a higher order function.
// I'm keeping these routes here just for swagger.json creation.

// router.get('/', getWorkouts);
// router.get('/:id', getWorkoutById);
// router.post('/', validate(WorkoutSchema), createWorkout);
// router.put('/:id', validate(WorkoutSchema), updateWorkout);
// router.delete('/:id', deleteWorkout);

export default router;
