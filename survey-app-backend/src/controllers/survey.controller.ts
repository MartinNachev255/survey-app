import express, { Request, Response, NextFunction } from 'express';
import { NewSurveyEntry, ISurvey } from '../types/survey.types';
import userAuth from '../middlewares/userAuth';
import surveyService from '../services/survey.service';
import { IUser } from '../types/user.types';
import { JwtPayload } from 'jsonwebtoken';
import {
  newSurveyParser,
  newAnswersEntryParser,
} from '../utils/validationParsers';

const surveyRouter = express.Router();

interface CustomRequest extends Request {
  token: string | JwtPayload;
  id: string;
  user?: unknown;
}

surveyRouter.get(
  '/',
  async (_req: Request, res: Response<ISurvey[]>, next: NextFunction) => {
    try {
      const surveys = await surveyService.getAllSurveys();
      if (surveys) res.status(200).json(surveys);
    } catch (error) {
      next(error);
    }
  },
);

surveyRouter.get(
  '/:id',
  async (req: Request, res: Response<ISurvey>, next: NextFunction) => {
    try {
      const survey = await surveyService.getSurveyById(req.params.id);
      if (survey) res.status(200).json(survey);
    } catch (error) {
      next(error);
    }
  },
);

surveyRouter.post(
  '/',
  newSurveyParser,
  userAuth.tokenExtractor,
  userAuth.userExtractor,
  async (
    req: Request<unknown, unknown, NewSurveyEntry>,
    res: Response<NewSurveyEntry>,
    next: NextFunction,
  ) => {
    try {
      const addedSurvey = await surveyService.createNewSurvey(
        req.body,
        (req as CustomRequest).user as IUser,
      );
      res.status(200).json(addedSurvey);
    } catch (error) {
      next(error);
    }
  },
);

surveyRouter.put(
  '/:id',
  newSurveyParser,
  userAuth.tokenExtractor,
  userAuth.userExtractor,
  async (
    req: Request<{ id: string }, unknown, NewSurveyEntry>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const updatedSurvey = await surveyService.updateSurvey(
        req.params.id,
        req.body,
        (req as unknown as CustomRequest).user as IUser,
      );

      if (updatedSurvey) {
        res.status(200).json({
          success: true,
          updatedSurveyID: updatedSurvey?.id,
        });
      }
    } catch (error) {
      next(error);
    }
  },
);

surveyRouter.delete(
  '/:id',
  userAuth.tokenExtractor,
  userAuth.userExtractor,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const surveyIsDeleted = await surveyService.deleteSurvey(
        req.params.id,
        (req as CustomRequest).user as IUser,
      );

      if (surveyIsDeleted) res.status(204).end();
    } catch (error) {
      next(error);
    }
  },
);

surveyRouter.post(
  '/:id/respond',
  userAuth.tokenExtractor,
  newAnswersEntryParser,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const surveyID = req.params.id;

      const updatedAnswers = await surveyService.incrementAnswers(
        surveyID,
        req.body,
      );

      res.status(200).json({
        success: true,
        modifiedContent: updatedAnswers?.modifiedCount,
      });
    } catch (error) {
      next(error);
    }
  },
);

export default surveyRouter;
