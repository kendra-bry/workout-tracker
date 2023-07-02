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

// router.get('/', handleErrors(getExercises));
// router.get('/:id', handleErrors(getExerciseById));
// router.post('/', validate(ExerciseSchema), handleErrors(createExercise));
// router.put('/:id', validate(ExerciseSchema), handleErrors(updateExerciseById));
// router.delete('/:id', handleErrors(deleteExercise));

// Keeping these here for when I need to regenerate the swagger doc. Swagger-autogen breaks when my controllers are wrapped in middleware
/**
 * @swagger
 * /protected:
 *   get:
 *     security:
 *       - OAuth2: []
 */
router.get('/', getExercises);
/**
 * @swagger
 * /protected:
 *   get:
 *     security:
 *       - OAuth2: []
 */
router.get('/:id', getExerciseById);
/**
 * @swagger
 * /protected:
 *   get:
 *     security:
 *       - OAuth2: []
 */
router.post('/', validate(ExerciseSchema), createExercise);
/**
 * @swagger
 * /protected:
 *   get:
 *     security:
 *       - OAuth2: []
 */
router.put('/:id', validate(ExerciseSchema), updateExerciseById);
/**
 * @swagger
 * /protected:
 *   get:
 *     security:
 *       - OAuth2: []
 */
router.delete('/:id', deleteExercise);

export default router;
