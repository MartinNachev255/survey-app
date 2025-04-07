import { createSlice, Dispatch } from '@reduxjs/toolkit';
import surveyServices from '../services/surveys';
import { ISurvey } from '../utils/types';

const initialState: ISurvey[] = [];

const surveySlice = createSlice({
  name: 'surveys',
  initialState,
  reducers: {
    setSurveys(_state, action) {
      return action.payload;
    },
  },
});

export const { setSurveys } = surveySlice.actions;

export const initializeSurveys = () => {
  return async (dispatch: Dispatch) => {
    const surveys = await surveyServices.getAllSurveys();
    dispatch(setSurveys(surveys));
  };
};

export default surveySlice.reducer;
