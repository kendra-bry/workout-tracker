import { Router } from 'express';
import { ensureAuth } from '../middleware';
import auth from './auth';
import exercises from './exercises';
import workouts from './workouts';

const router = Router();

router.use('/auth', auth);

router.use(ensureAuth);

router.use('/exercises', exercises);
router.use('/workouts', workouts);

export default router;
