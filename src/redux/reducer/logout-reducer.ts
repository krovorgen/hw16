import { createSlice } from '@reduxjs/toolkit';

const logoutSlice = createSlice({
  name: 'logout',
  initialState: {}, //todo type of initial state of Login
  reducers: {
    setProfileDeleteData(state) {},
  },
});

export default logoutSlice.reducer;

export const { setProfileDeleteData } = logoutSlice.actions;
