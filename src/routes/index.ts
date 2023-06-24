import { Router } from 'express';
import exerciseTypes from './exerciseTypes';
import exercises from './exercises';
import workouts from './workouts';

const router = Router();

router.use('/exercises', exercises);
// router.use('/exerciseTypes', exerciseTypes);
router.use('/workouts', workouts);

export default router;