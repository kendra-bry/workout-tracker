import { Request, Response, Router } from 'express';
import passport from 'passport';

const router = Router();

router.get('/github',
// #swagger.ignore = true
passport.authenticate('github'));

router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/' }), (req: Request, res: Response) => {
  // #swagger.ignore = true
  res.redirect('/api-docs');
});

export default router;
