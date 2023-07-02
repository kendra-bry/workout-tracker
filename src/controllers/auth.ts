import { NextFunction, Request, Response } from 'express';

let redirectUrl = `${process.env.BASE_URL}:${process.env.PORT}${process.env.GITHUB_CALLBACK_URL}`;

if (process.env.NODE_ENV === 'prod') {
  redirectUrl = `${process.env.BASE_URL}${process.env.GITHUB_CALLBACK_URL}`;
}

const login = (req: Request, res: Response) => {
  // #swagger.ignore = true
  res.redirect(redirectUrl);
};

const logout = (req: Request, res: Response, next: NextFunction) => {
  // #swagger.ignore = true
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    res.redirect(redirectUrl);
  });
};

export { login, logout };
