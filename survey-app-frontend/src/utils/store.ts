import { configureStore } from '@reduxjs/toolkit';
import surveyReducer from '../reducers/surveyReducer';
import userReducer from '../reducers/userReducer';

const store = configureStore({
  reducer: {
    surveys: surveyReducer,
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export default store;
