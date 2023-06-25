// prettier-ignore
import {
  createExercise,
  deleteExercise,
  getExercises,
  getExerciseById,
  updateExerciseById,
} from '../controllers/exercises';
import { Router } from 'express';
import { ExerciseSchema } from '../schemas/schema';
import { handleErrors, validate } from '../middleware';

const router = Router();

router.get('/', handleErrors(getExercises));
router.get('/:id', handleErrors(getExerciseById));
router.post('/', validate(ExerciseSchema), handleErrors(createExercise));
router.put('/:id', validate(ExerciseSchema), handleErrors(updateExerciseById));
router.delete('/:id', handleErrors(deleteExercise));

export default router;
