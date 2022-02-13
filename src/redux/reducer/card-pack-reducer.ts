import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GetPackResponse } from '../../api';

export type InitialStateType = {
  responseData: GetPackResponse | null;
};

const initialState: InitialStateType = {
  responseData: null,
};

const slice = createSlice({
  name: 'card-pack',
  initialState,
  reducers: {
    setCardPack(state, action: PayloadAction<GetPackResponse>) {
      state.responseData = action.payload;
    },
  },
});

export const cardPackReducer = slice.reducer;
export const { setCardPack } = slice.actions;
