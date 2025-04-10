import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { AnswerSelection, NewSurveyEntry } from '../utils/types';

const baseUrl = 'http://localhost:3000/api/survey';

let token: string | null = null;

const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`;
};

export const isTokenExpired = (): boolean => {
  if (!token) return true;
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);

    if (decodedToken.exp && decodedToken.exp < currentTime + 15) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
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
  isTokenExpired,
  getAllSurveys,
  createNewSurvey,
  submitAnswers,
  deleteSurvey,
};
