import { NewSurveyEntry, AnswersEntry } from '../types/survey.types';
import Survey from '../modules/Survey';
import { IUser } from '../types/user.types';
import User from '../modules/User';
import { CustomError } from '../utils/customError';
import logger from '../config/logger';

const getAllSurveys = async () => {
  const surveys = await Survey.find({});
  return surveys;
};

const getSurveyById = async (surveyID: string) => {
  const survey = await Survey.findById(surveyID);
  if (!survey) {
    throw new CustomError(`Survey with ID ${surveyID} not found`, 404);
  }
  return survey;
};

const createNewSurvey = async (survey: NewSurveyEntry, user: IUser) => {
  const newSurvey = new Survey({
    ...survey,
    user: user.id,
    author: user.name,
  });

  logger.debug(`Attempting to save newSurvey to database`);
  const savedSurvey = await newSurvey.save();
  logger.debug('Survey saved successfully');

  logger.debug("Attempting to update user's surveys");
  User.updateOne(
    { _id: user.id },
    { $push: { surveys: savedSurvey.id } },
  ).exec();
  logger.debug('Adding survey to user is successful');

  return savedSurvey;
};

const deleteSurvey = async (surveyID: string, user: IUser) => {
  const surveyToDelete = await Survey.findById(surveyID);

  if (!surveyToDelete) {
    throw new CustomError(`Survey with ID ${surveyID} not found`, 404);
  }

  if (surveyToDelete.user.toString() !== user.id) {
    throw new CustomError('Unauthorized to delete this survey', 401);
  }
  await Survey.findByIdAndDelete(surveyID);
  return true;
};

const updateSurvey = async (
  surveyId: string,
  survey: NewSurveyEntry,
  user: IUser,
) => {
  const surveyToUpdate = await Survey.findById(surveyId);

  if (!surveyToUpdate) {
    throw new CustomError(`Survey with ID ${surveyId} not found`, 404);
  }

  if (surveyToUpdate.user.toString() !== user.id) {
    throw new CustomError('Unauthorized to update this survey', 401);
  }

  const updatedSurvey = await Survey.findByIdAndUpdate(surveyId, survey, {
    new: true,
  });

  return updatedSurvey;
};

const incrementAnswers = async (surveyID: string, answers: AnswersEntry[]) => {
  const surveyExists = await Survey.findById(surveyID);
  if (!surveyExists) {
    throw new CustomError(`Survey with ID ${surveyID} not found`, 404);
  }

  const updateOperations = answers.map((answer) => ({
    updateOne: {
      filter: { _id: surveyID },
      update: {
        $inc: {
          [`questions.${answer.questionsIndex}.answers.${answer.answersIndex}.timesAnswered`]: 1,
        },
      },
    },
  }));

  const result = await Survey.bulkWrite(updateOperations);

  if (result.modifiedCount === 0) {
    logger.warn(
      `IncrementAnswers for survey ${surveyID} resulted in 0 modifications.`,
    );
  }

  return result;
};

export default {
  getAllSurveys,
  getSurveyById,
  createNewSurvey,
  deleteSurvey,
  updateSurvey,
  incrementAnswers,
};
