import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatusType } from '../../types';

export type InitialStateType = {
  status: RequestStatusType;
  initialized: boolean;
};

const initialState: InitialStateType = {
  status: 'idle',
  initialized: true,
};

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    changeInitializedStatusAC(state, action: PayloadAction<boolean>) {
      state.initialized = action.payload;
    },

    setStatusAppAC(state, action: PayloadAction<RequestStatusType>) {
      state.status = action.payload;
    },
  },
});

export const appReducer = slice.reducer;
export const { changeInitializedStatusAC, setStatusAppAC } = slice.actions;
