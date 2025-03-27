import { NewSurveyEntry } from '../types/survey.types';
import Survey from '../modules/Survey';
import { NextFunction } from 'express';
import { IUser } from '../types/user.types';
import User from '../modules/User';
import { CustomError } from '../utils/customError';

const createNewSurvey = async (
  survey: NewSurveyEntry,
  user: IUser,
  next: NextFunction,
) => {
  try {
    const newSurvey = new Survey({
      ...survey,
      user: user.id,
    });

    const savedSurvey = await newSurvey.save();
    user.surveys = user.surveys.concat(savedSurvey._id);
    User.updateOne(
      { _id: user.id },
      { $push: { surveys: savedSurvey.id } },
    ).exec();

    return savedSurvey;
  } catch (error) {
    next(error);
    return;
  }
};

const deleteSurvey = async (
  surveyID: string,
  user: IUser,
  next: NextFunction,
) => {
  try {
    const surveyToDelete = await Survey.findById(surveyID);

    if (surveyToDelete?.user.toString() !== user.id) {
      throw new CustomError('unauthorized', 401);
    }
    await Survey.findByIdAndDelete(surveyID);
    return true;
  } catch (error) {
    next(error);
    return;
  }
};

export default {
  createNewSurvey,
  deleteSurvey,
};
