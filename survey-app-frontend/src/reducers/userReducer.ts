import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '../utils/types';

const initialState: IUser | null = null;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(_state, action) {
      return action.payload;
    },
    clearUser() {
      return initialState;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
