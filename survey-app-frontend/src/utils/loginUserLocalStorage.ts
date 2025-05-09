import { setUser } from '../reducers/userReducer';
import surveyService from '../services/surveys';
import { Dispatch } from '@reduxjs/toolkit';

export const loginUserFromLocalStorage = (dispatch: Dispatch) => {
  const loggedUserJson = window.localStorage.getItem('loggedSurveyAppUser');
  if (loggedUserJson) {
    const user = JSON.parse(loggedUserJson);
    dispatch(setUser(user));
    surveyService.setToken(user.token);
  }
};

export default { loginUserFromLocalStorage };
