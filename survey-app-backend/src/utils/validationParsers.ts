import { Request, Response, NextFunction } from 'express';
import {
  newSurveyEntrySchema,
  newAnswersEntrySchema,
} from '../validation/survey.validation';
import { newUserEntrySchema } from '../validation/user.validation';

export const newUserParser = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    newUserEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

export const newSurveyParser = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    newSurveyEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

export const newAnswersEntryParser = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    newAnswersEntrySchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
