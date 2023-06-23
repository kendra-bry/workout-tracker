import { Router } from 'express';
import { getWorkouts, createWorkout, getWorkoutById, updateWorkout, deleteWorkout } from '../controllers/workouts';

const router = Router();

router.get('/', getWorkouts);
router.get('/:id', getWorkoutById);
router.post('/', createWorkout);
router.put('/:id', updateWorkout);
router.delete('/:id', deleteWorkout);

export default router;
