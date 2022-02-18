import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CardItemType } from '../../api';

export type InitialStateType = {
  page: number;
  pageCount: number;
  cards: CardItemType[];
  cardsTotalCount: number;
  packUserId: null | string;
};

const initialState: InitialStateType = {
  page: 0,
  pageCount: 5,
  cards: [],
  cardsTotalCount: 0,
  packUserId: null,
};

const slice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    setCard(state, action: PayloadAction<CardItemType[]>) {
      state.cards = action.payload;
    },
    setCardsTotalCount(state, action: PayloadAction<number>) {
      state.cardsTotalCount = action.payload;
    },
    resetCard(state) {
      state.cards = [];
    },
    setCardUserId(state, action: PayloadAction<string | null>) {
      state.packUserId = action.payload;
    },
  },
});

export const { setCard, setCardsTotalCount, resetCard, setCardUserId } = slice.actions;

export const cardReducer = slice.reducer;
