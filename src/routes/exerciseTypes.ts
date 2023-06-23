import { Router } from 'express';
import { getExerciseTypes, createExerciseType, getExerciseType, updateExerciseType, deleteExerciseType } from '../controllers/exerciseTypes';

const router = Router();

router.get('/', getExerciseTypes);
router.get('/:id', getExerciseType);
router.post('/', createExerciseType);
router.put('/:id', updateExerciseType);
router.delete('/:id', deleteExerciseType);

export default router;
