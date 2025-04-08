import axios from 'axios';
import { AnswerSelection, NewSurveyEntry } from '../utils/types';
const baseUrl = 'http://localhost:3000/api/survey';

let token: string | null = null;

const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`;
};

const getAllSurveys = async () => {
  const config = {};

  const res = await axios.get(baseUrl, config);
  return res.data;
};

const submitAnswers = async (surveyId: string, answers: AnswerSelection[]) => {
  const config = {
    headers: { Authorization: token },
  };

  const res = await axios.post(
    `${baseUrl}/${surveyId}/respond`,
    answers,
    config,
  );
  return res.data;
};

const createNewSurvey = async (newSurvey: NewSurveyEntry) => {
  const config = {
    headers: { Authorization: token },
  };

  const res = await axios.post(baseUrl, newSurvey, config);

  return res.data;
};

const deleteSurvey = async (id: string) => {
  const config = {
    headers: { Authorization: token },
  };

  const req = await axios.delete(`${baseUrl}/${id}`, config);
  return req.data;
};

export default {
  setToken,
  getAllSurveys,
  createNewSurvey,
  submitAnswers,
  deleteSurvey,
};
