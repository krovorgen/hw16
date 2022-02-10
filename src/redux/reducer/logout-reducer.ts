import { createSlice } from '@reduxjs/toolkit';

// slice reducer
const logoutSlice = createSlice({
  name: 'logout',
  initialState: {}, //todo type of initial state of Login
  reducers: {
    setProfileDeleteData(state) {},
  },
});

export default logoutSlice.reducer;

// slice action creator

export const { setProfileDeleteData } = logoutSlice.actions;
