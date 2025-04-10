import { createSlice } from '@reduxjs/toolkit';

const initialState: string = '';

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotificationMsg(_state, action) {
      return action.payload;
    },
    clearNotificationMsg() {
      return initialState;
    },
  },
});

export const { setNotificationMsg, clearNotificationMsg } =
  notificationSlice.actions;

export default notificationSlice.reducer;
