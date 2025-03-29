import express, { Request, Response, NextFunction } from 'express';
import {
  newSurveyEntrySchema,
  newAnswersEntrySchema,
} from '../validation/survey.validation';
import { NewSurveyEntry } from '../types/survey.types';
import userAuth from '../middlewares/userAuth';
import surveyService from '../services/survey.service';
import { IUser } from '../types/user.types';
import { JwtPayload } from 'jsonwebtoken';

const surveyRouter = express.Router();

interface CustomRequest extends Request {
  token: string | JwtPayload;
  user?: unknown;
}

const newSurveyParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newSurveyEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

surveyRouter.post(
  '/',
  newSurveyParser,
  userAuth.userExtractor,
  async (
    req: Request<unknown, unknown, NewSurveyEntry>,
    res: Response<NewSurveyEntry>,
    next: NextFunction,
  ) => {
    const addedSurvey = await surveyService.createNewSurvey(
      req.body,
      (req as CustomRequest).user as IUser,
      next,
    );
    res.status(200).json(addedSurvey);
  },
);

surveyRouter.delete(
  '/:id',
  userAuth.userExtractor,
  async (req: Request, res: Response, next: NextFunction) => {
    const surveyIsDeleted = await surveyService.deleteSurvey(
      req.params.id,
      (req as CustomRequest).user as IUser,
      next,
    );

    if (surveyIsDeleted) res.status(204).end();
  },
);

const newAnsersEntryParser = (
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

surveyRouter.post(
  '/:id/respond',
  newAnsersEntryParser,
  async (req: Request, res: Response, next: NextFunction) => {
    const surveyID = req.params.id;

    const updatedAnswers = await surveyService.incrementAnswers(
      surveyID,
      req.body,
      next,
    );

    res.status(200).json({
      success: true,
      modifiedContent: updatedAnswers?.modifiedCount,
    });
  },
);

export default surveyRouter;
