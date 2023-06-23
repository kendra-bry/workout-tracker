// prettier-ignore
import {
  createWorkout,
  deleteWorkout,
  getWorkouts,
  getWorkoutById,
  updateWorkout,
} from '../controllers/workouts';
import { Router } from 'express';
import { validate } from '../middleware';
import { WorkoutSchema } from '../schemas/schema';

const router = Router();

router.get('/', getWorkouts);
router.get('/:id', getWorkoutById);
router.post('/', validate(WorkoutSchema), createWorkout);
router.put('/:id', validate(WorkoutSchema), updateWorkout);
router.delete('/:id', deleteWorkout);

export default router;
