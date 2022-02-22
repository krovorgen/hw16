import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GetPackResponse } from '../../api';

export type ModelCardPackUpdate = {
  page?: number;
  pageCount?: number;
  ownerCardPack?: boolean;
  searchValue?: string;
  sortPacks?: string;
  min?: string;
  max?: string;
};

export type InitialStateType = {
  responseData: GetPackResponse | null;
  page: number;
  pageCount: number;
  ownerCardPack: boolean;
  searchValue: string;
  sortPacks: string;
  min?: string;
  max?: string;
};

const initialState: InitialStateType = {
  responseData: null,
  page: 0,
  pageCount: 5,
  ownerCardPack: false,
  searchValue: '',
  sortPacks: '', 
  min: '',
  max: ''
};

const slice = createSlice({
  name: 'card-pack',
  initialState,
  reducers: {
    setCardPack(state, action: PayloadAction<GetPackResponse>) {
      state.responseData = action.payload;
    },
    changeResponseValue(state, action: PayloadAction<ModelCardPackUpdate>) {
      console.log(state);
      return { ...state, ...action.payload };
    },
  },
});

export const cardPackReducer = slice.reducer;
export const { setCardPack, changeResponseValue } = slice.actions;
