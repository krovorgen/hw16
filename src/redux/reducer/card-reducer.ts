import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CardItemType } from '../../api';

type ModelCardUpdate = {
  page?: number;
  pageCount?: number;
};

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
    setCard(state, action: PayloadAction<{ cards: CardItemType[]; cardsTotalCount: number; packUserId: string }>) {
      const { cards, cardsTotalCount, packUserId } = action.payload;
      state.cards = cards;
      state.cardsTotalCount = cardsTotalCount;
      state.packUserId = packUserId;
    },
    setCardsTotalCount(state, action: PayloadAction<number>) {
      state.cardsTotalCount = action.payload;
    },
    resetCard(state) {
      state.cards = [];
      state.packUserId = null;
    },
    setCardUserId(state, action: PayloadAction<string | null>) {
      state.packUserId = action.payload;
    },
    changeResponseValue(state, action: PayloadAction<ModelCardUpdate>) {
      return { ...state, ...action.payload };
    },
  },
});

export const { setCard, resetCard, changeResponseValue } = slice.actions;

export const cardReducer = slice.reducer;
