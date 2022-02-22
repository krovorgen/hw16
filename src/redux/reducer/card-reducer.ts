import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CardItemType } from '../../api';

type ModelCardUpdate = {
  page?: number;
  pageCount?: number;
  sortCards?: undefined | string;
  cardQuestion?: string;
};

export type InitialStateType = {
  page: number;
  pageCount: number;
  cards: CardItemType[];
  cardsTotalCount: number;
  packUserId: null | string;
  sortCards: undefined | string;
  cardQuestion: string;
};

const initialState: InitialStateType = {
  page: 0,
  pageCount: 5,
  cards: [],
  cardsTotalCount: 0,
  packUserId: null,
  sortCards: undefined,
  cardQuestion: '',
};

const slice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    setCard(state, action: PayloadAction<{ cards: CardItemType[]; cardsTotalCount: number; packUserId: string }>) {
      const { cards, cardsTotalCount, packUserId } = action.payload;
      state.cards = cards;
      state.cardsTotalCount = cardsTotalCount;
      state.packUserId = packUserId;
    },
    resetCard(state) {
      state.cards = [];
      state.packUserId = null;
      state.page = 0;
    },
    changeResponseValue(state, action: PayloadAction<ModelCardUpdate>) {
      return { ...state, ...action.payload };
    },
  },
});

export const { setCard, resetCard, changeResponseValue } = slice.actions;

export const cardReducer = slice.reducer;
