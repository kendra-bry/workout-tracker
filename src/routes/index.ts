import { Router } from 'express';
import exercises from './exercises';
import workouts from './workouts';

const router = Router();

router.use('/exercises', exercises);
router.use('/workouts', workouts);

export default router;