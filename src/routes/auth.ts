import { Request, Response, Router } from 'express';
import passport from 'passport';

const router = Router();

let redirectUrl = `${process.env.BASE_URL}:${process.env.PORT}`;

if (process.env.NODE_ENV === 'prod') {
  redirectUrl = `${process.env.BASE_URL}`;
}

router.get('/github', passport.authenticate('github'));
router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/' }), (req: Request, res: Response) => {
  res.redirect(`${redirectUrl}/api-docs`);
});

export default router;
