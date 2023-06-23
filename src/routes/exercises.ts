// prettier-ignore
import {
  createExercise,
  deleteExercise,
  getExercises,
  getExerciseById,
  updateExerciseById,
} from '../controllers/exercises';
import { Router } from 'express';
import { validate } from '../middleware';
import { ExerciseSchema } from '../schemas/schema';

const router = Router();

router.get('/', getExercises);
router.get('/:id', getExerciseById);
router.post('/', validate(ExerciseSchema), createExercise);
router.put('/:id', validate(ExerciseSchema), updateExerciseById);
router.delete('/:id', deleteExercise);

export default router;
