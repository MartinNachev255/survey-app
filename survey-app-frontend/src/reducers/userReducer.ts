import { createSlice } from '@reduxjs/toolkit';

const initialState = null;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(_state, action) {
      return action.payload;
    },
    clearUser(_state, _action) {
      return initialState;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
