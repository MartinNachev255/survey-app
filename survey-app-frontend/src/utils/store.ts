import { configureStore } from '@reduxjs/toolkit';
import surveyReducer from '../reducers/surveyReducer';
import userReducer from '../reducers/userReducer';
import notificationReducer from '../reducers/notificationReducer';

const store = configureStore({
  reducer: {
    surveys: surveyReducer,
    user: userReducer,
    notification: notificationReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootStore = ReturnType<typeof store.getState>;
export default store;
