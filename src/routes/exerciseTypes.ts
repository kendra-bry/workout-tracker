import { Router } from 'express';
import { getExerciseTypes, createExerciseType } from '../controllers/exerciseTypes';

const router = Router();

router.get('/', getExerciseTypes);
router.post('/', createExerciseType);

export default router;
