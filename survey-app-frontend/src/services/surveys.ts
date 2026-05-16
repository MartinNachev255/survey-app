import { jwtDecode } from 'jwt-decode';
import { AnswerSelection, NewSurveyEntry } from '../utils/types';

const baseUrl = '/api/survey';

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
  const response = await fetch(baseUrl);
  const data = await response.json();

  if (!response.ok) {
    throw {
      response: {
        data: data,
      },
    };
  }

  return data;
};

const submitAnswers = async (surveyId: string, answers: AnswerSelection[]) => {
  const response = await fetch(`${baseUrl}/${surveyId}/respond`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token || '',
    },
    body: JSON.stringify(answers),
  });

  const data = await response.json();

  if (!response.ok) {
    throw {
      response: {
        data: data,
      },
    };
  }

  return data;
};

const createNewSurvey = async (newSurvey: NewSurveyEntry) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token || '',
    },
    body: JSON.stringify(newSurvey),
  });

  const data = await response.json();

  if (!response.ok) {
    throw {
      response: {
        data: data,
      },
    };
  }

  return data;
};

const deleteSurvey = async (id: string) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: token || '',
    },
  });

  if (!response.ok) {
    const data = await response.json();
    throw {
      response: {
        data: data,
      },
    };
  }

  // Fetch doesn't automatically parse JSON, and sometimes DELETE returns 204 No Content.
  if (response.status === 204) {
    return null;
  }
  return await response.json();
};

export default {
  setToken,
  isTokenExpired,
  getAllSurveys,
  createNewSurvey,
  submitAnswers,
  deleteSurvey,
};
