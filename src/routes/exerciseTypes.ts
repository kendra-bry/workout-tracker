// prettier-ignore
import {
  createExerciseType,
  deleteExerciseType,
  getExerciseType,
  getExerciseTypes,
  updateExerciseType,
} from '../controllers/exerciseTypes';
import { Router } from 'express';
import { validate } from '../middleware';
import { ExerciseTypeSchema } from '../schemas/schema';

const router = Router();

router.get('/', getExerciseTypes);
router.get('/:id', getExerciseType);
router.post('/', validate(ExerciseTypeSchema), createExerciseType);
router.put('/:id', validate(ExerciseTypeSchema), updateExerciseType);
router.delete('/:id', deleteExerciseType);

export default router;
