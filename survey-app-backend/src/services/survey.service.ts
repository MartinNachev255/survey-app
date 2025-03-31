import { NewSurveyEntry, AnswersEntry } from '../types/survey.types';
import Survey from '../modules/Survey';
import { NextFunction } from 'express';
import { IUser } from '../types/user.types';
import User from '../modules/User';
import { CustomError } from '../utils/customError';

const getAllSurveys = async (next: NextFunction) => {
  try {
    const surveys = await Survey.find({});
    return surveys;
  } catch (error) {
    next(error);
    return;
  }
};

const getSurveyById = async (surveyID: string, next: NextFunction) => {
  try {
    const survey = await Survey.findById(surveyID);
    return survey;
  } catch (error) {
    next(error);
    return;
  }
};

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

const updateSurvey = async (
  surveyId: string,
  survey: NewSurveyEntry,
  user: IUser,
  next: NextFunction,
) => {
  try {
    const surveyToUpdate = await Survey.findById(surveyId);

    if (surveyToUpdate?.user.toString() !== user.id) {
      throw new CustomError('unauthorized', 401);
    }

    const updatedSurvey = await Survey.findByIdAndUpdate(surveyId, survey);

    return updatedSurvey;
  } catch (error) {
    next(error);
    return;
  }
};

const incrementAnswers = async (
  surveyID: string,
  answers: AnswersEntry[],
  next: NextFunction,
) => {
  try {
    const updateOperations = answers.map((answer) => ({
      updateOne: {
        filter: { _id: surveyID },
        update: {
          $inc: {
            [`questions.${answer.questionsIndex}.answers.${answer.answersIndex}.timesAnswerd`]: 1,
          },
        },
      },
    }));

    const result = await Survey.bulkWrite(updateOperations);

    return result;
  } catch (error) {
    next(error);
    return;
  }
};

export default {
  getAllSurveys,
  getSurveyById,
  createNewSurvey,
  deleteSurvey,
  updateSurvey,
  incrementAnswers,
};
