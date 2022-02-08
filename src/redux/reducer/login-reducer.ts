import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: InitialStateType = {
  isLoggedIn: false,
  loading: false,
};

const slice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLoginLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const loginReducer = slice.reducer;

export const { setLoginLoading, setIsLoggedIn } = slice.actions;

type InitialStateType = {
  isLoggedIn: boolean;
  loading: boolean;
};
