import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CardItemType } from '../../api';

export type InitialStateType = {
  page: number;
  pageCount: number;
  cards: CardItemType[];
  cardsTotalCount: number;
};

const initialState: InitialStateType = {
  page: 0,
  pageCount: 5,
  cards: [],
  cardsTotalCount: 0,
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
  },
});

export const { setCard, setCardsTotalCount, resetCard } = slice.actions;

export const cardReducer = slice.reducer;
