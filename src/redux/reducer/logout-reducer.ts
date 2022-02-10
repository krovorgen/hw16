import { createSlice } from '@reduxjs/toolkit';

// slice reducer
const logoutSlice = createSlice({
  name: 'logout',
  initialState: {}, //todo type of initial state of Login
  reducers: {
    setProfileDeleteData(state) {
      state.isLoggedIn = false; //todo to take name from Login
    },
  },
});

export default logoutSlice.reducer;

// slice action creator

export const { setProfileDeleteData } = logoutSlice.actions;
