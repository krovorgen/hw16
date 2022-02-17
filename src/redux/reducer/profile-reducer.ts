import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
  name: 'profile',
  initialState: {} as ProfileInitialStateType,
  reducers: {
    authProfileData(state, action: PayloadAction<ProfileInitialStateType>) {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.avatar = action.payload.avatar;
      state._id = action.payload._id;
    },

    updateProfileData(state, action: PayloadAction<{ text: string; avatar: string }>) {
      state.name = action.payload.text;
      state.avatar = action.payload.avatar;
    },
  },
});

export default profileSlice.reducer;

export const { updateProfileData, authProfileData } = profileSlice.actions;

export type ProfileInitialStateType = {
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
