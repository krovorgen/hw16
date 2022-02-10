import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

//slice reducer
const profileSlice = createSlice({
  name: 'profile',
  initialState: {} as profileInitialStateType,
  reducers: {
    updateProfileData(state, action: PayloadAction<{ text: string; avatar: string }>) {
      state.name = action.payload.text;
      state.avatar = action.payload.avatar;
    },
  },
});

export default profileSlice.reducer;

// slice action creators
export const { updateProfileData } = profileSlice.actions;

//types
export type profileInitialStateType = {
  _id: string;
  email: string;
  name: string;
  avatar: string;
  publicCardPacksCount: number;
  token?: string;
  created: Date | null;
  updated: Date | null;
  isAdmin: boolean;
  verified: boolean;
  rememberMe: boolean;
  error: string;
};
