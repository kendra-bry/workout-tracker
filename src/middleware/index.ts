import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

export const universalErrorHandler = (err: any, req: Request, res: Response) => {
  if (process.env.NODE_ENV === 'dev') console.log({ err });
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';
  res.status(err.statusCode).json({
    message: err.message,
  });
};

export const addUniversalResponseHeaders = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'application/json');
  next();
};

export const validate = (schema: Joi.ObjectSchema, customOptions?: Joi.BaseValidationOptions) => {
  const options = {
    abortEarly: false,
    debug: process.env.NODE_ENV === 'dev' ? true : false,
    stack: process.env.NODE_ENV === 'dev' ? true : false,
    stripUnknown: true,
    ...customOptions,
  };
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, options);
    if (error) {
      let errors = error.details.map((err) => {
        let msg = err.message.replace(/"/g, '');
        return msg.charAt(0).toUpperCase() + msg.slice(1);
      });
      return res.status(400).json({ validationErrors: errors });
    }
    next();
  };
};
