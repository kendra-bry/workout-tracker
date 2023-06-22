import { Router } from 'express';
import { getExercises, createExercise } from '../controllers/exercises';

const router = Router();

router.get('/', getExercises);
router.post('/', createExercise);

export default router;
