import { NextFunction, Request, Response } from 'express';

const login = (req: Request, res: Response) => {
  // #swagger.ignore = true
  const redirectUrl = `${process.env.BASE_URL}:${process.env.PORT}/api-docs`;
  res.redirect(redirectUrl);
};

const logout = (req: Request, res: Response, next: NextFunction) => {
  // #swagger.ignore = true
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    const redirectUrl = `${process.env.BASE_URL}:${process.env.PORT}`;
    res.redirect(redirectUrl);
  });
};

export { login, logout };
