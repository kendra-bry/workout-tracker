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

// Swagger-autogen breaks when my controllers are wrapped in a higher order function.
// I'm keeping these routes here just for swagger.json creation.

// router.get('/', getExercises);
// router.get('/:id', getExerciseById);
// router.post('/', validate(ExerciseSchema), createExercise);
// router.put('/:id', validate(ExerciseSchema), updateExerciseById);
// router.delete('/:id', deleteExercise);

export default router;
