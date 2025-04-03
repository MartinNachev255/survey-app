import { setUser } from '../reducers/userReducer';
import surveyServices from '../services/surveys';
import { NavigateFunction } from 'react-router-dom';
import { Dispatch } from '@reduxjs/toolkit';

export const loginUserFromLocalStorage = (
  dispatch: Dispatch,
  navigate: NavigateFunction,
) => {
  const loggedUserJson = window.localStorage.getItem('loggedSurveyAppUser');
  if (loggedUserJson) {
    const user = JSON.parse(loggedUserJson);
    dispatch(setUser(user));
    surveyServices.setToken(user.token);
    if (user === null) {
      navigate('/login');
    }
  }
};

export default { loginUserFromLocalStorage };
