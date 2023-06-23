import { Router } from 'express';
import { getExercises, createExercise, getExerciseById, updateExerciseById, deleteExercise } from '../controllers/exercises';

const router = Router();

router.get('/', getExercises);
router.get('/:id', getExerciseById);
router.post('/', createExercise);
router.put('/:id', updateExerciseById);
router.delete('/:id', deleteExercise);

export default router;
