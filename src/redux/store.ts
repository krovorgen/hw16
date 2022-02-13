import logger from 'redux-logger';
import rootReducer from './root-reducer';
import thunkMiddleware from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware).concat(logger),
});

export type AppDispatch = typeof store.dispatch;
export type RootStateType = ReturnType<typeof store.getState>;

export default store;
