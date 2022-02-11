import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type InitialStateType = {
  initialized: boolean;
};

const initialState: InitialStateType = {
  initialized: true,
};

const slice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    changeInitializedStatusAC(state, action: PayloadAction<boolean>) {
      state.initialized = action.payload;
    },
  },
});

export const appReducer = slice.reducer;
export const { changeInitializedStatusAC } = slice.actions;
