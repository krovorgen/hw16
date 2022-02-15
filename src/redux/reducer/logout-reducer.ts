import { createSlice } from '@reduxjs/toolkit';

const logoutSlice = createSlice({
  name: 'logout',
  initialState: {},
  reducers: {
    setProfileDeleteData() {},
  },
});

export default logoutSlice.reducer;

export const { setProfileDeleteData } = logoutSlice.actions;
