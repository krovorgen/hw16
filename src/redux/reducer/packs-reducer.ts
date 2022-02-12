import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GetAllPacksResponseType, PackType } from '../../api';

const initialState: InitialStateType = {
  cardPacks: [] as Array<PackType>,
  cardPacksTotalCount: 0,
  maxCardsCount: 0,
  minCardsCount: 0,
  page: 0,
  pageCount: 0,
  loading: false,
};

const slice = createSlice({
  name: 'packs',
  initialState,
  reducers: {
    setPacks: (state, action: PayloadAction<GetAllPacksResponseType>) => {
      state.cardPacks = action.payload.cardPacks;
      state.cardPacksTotalCount = action.payload.cardPacksTotalCount;
      state.maxCardsCount = action.payload.maxCardsCount;
      state.minCardsCount = action.payload.minCardsCount;
      state.page = action.payload.page;
      state.pageCount = action.payload.pageCount;
    },
    setPacksLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const packsReducer = slice.reducer;

export const { setPacks, setPacksLoading } = slice.actions;

export type InitialStateType = GetAllPacksResponseType & {
  loading: boolean;
};
