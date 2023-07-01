import { Request, Response, Router } from 'express';
import passport from 'passport';

const router = Router();

router.get('/github', passport.authenticate('github'));
router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/' }), (req: Request, res: Response) => {
  res.redirect('/api-docs');
});

export default router;
