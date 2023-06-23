import { Router } from 'express';
import exerciseTypes from './exerciseTypes';
import exercises from './exercises';
import workouts from './workouts';

const router = Router();

router.use('/exercise', exercises);
router.use('/exerciseType', exerciseTypes);
router.use('/workout', workouts);

export default router;