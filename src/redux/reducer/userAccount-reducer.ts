import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: InitialStateType = {
  _id: '',
  name: '',
};

const slice = createSlice({
  name: 'userAccount',
  initialState,
  reducers: {
    setUserAccountData: (state, action: PayloadAction<{ _id: string; name: string }>) => {
      state._id = action.payload._id;
      state.name = action.payload.name;
    },
    clearUserAccountData: (state) => {
      state._id = '';
      state.name = '';
    },
  },
});

export const userAccountReducer = slice.reducer;

export const { setUserAccountData, clearUserAccountData } = slice.actions;

type InitialStateType = {
  _id: string;
  name: string;
};
