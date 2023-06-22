import { Router } from 'express';
import { getWorkouts, createWorkout } from '../controllers/workouts';

const router = Router();

router.get('/', getWorkouts);
router.post('/', createWorkout);

export default router;
