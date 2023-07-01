import { Router } from 'express';
import auth from './auth';
import exercises from './exercises';
import workouts from './workouts';

const router = Router();

router.use('/auth', auth);
router.use('/workouts', workouts);
router.use('/exercises', exercises);

export default router;