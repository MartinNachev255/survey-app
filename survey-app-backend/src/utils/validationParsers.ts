import { Request, Response, NextFunction } from 'express';
import {
  newSurveyEntrySchema,
  newAnswersEntrySchema,
} from '../validation/survey.validation';
import { newUserEnrtySchema } from '../validation/user.validation';

export const newUserParser = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    newUserEnrtySchema.parse(req.body);
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

export const newAnsersEntryParser = (
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
