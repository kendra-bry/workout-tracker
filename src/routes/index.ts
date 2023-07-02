import { Request, Response, Router } from 'express';
import { logout } from '../controllers/auth';
import { ensureAuth } from '../middleware';
import auth from './auth';
import exercises from './exercises';
import workouts from './workouts';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  // #swagger.ignore = true
  res.send('Please login in at /auth/github.');
});
router.post('/logout', logout);

router.use('/auth', auth);

// Ensure user is authenticated on the following routes.
router.use(ensureAuth);

router.use('/exercises', exercises);
router.use('/workouts', workouts);

export default router;
