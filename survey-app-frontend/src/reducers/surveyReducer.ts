import { createSlice, Dispatch } from '@reduxjs/toolkit';
import surveyService from '../services/surveys';
import { ISurvey } from '../utils/types';

const initialState: ISurvey[] = [];

const surveySlice = createSlice({
  name: 'surveys',
  initialState,
  reducers: {
    setSurveys(_state, action) {
      return action.payload;
    },
    appendSurvey(state, action) {
      state.push(action.payload);
    },
    removeSurvey(state, action) {
      return state.filter((survey) => survey.id !== action.payload);
    },
  },
});

export const { setSurveys, appendSurvey, removeSurvey } = surveySlice.actions;

export const initializeSurveys = () => {
  return async (dispatch: Dispatch) => {
    const surveys = await surveyService.getAllSurveys();
    dispatch(setSurveys(surveys));
  };
};

export default surveySlice.reducer;
