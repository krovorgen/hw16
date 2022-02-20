import thunkMiddleware from 'redux-thunk';
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import profileReducer from './reducer/profile-reducer';
import { loginReducer } from './reducer/login-reducer';
import { appReducer } from './reducer/app-reducer';
import { cardPackReducer } from './reducer/card-pack-reducer';
import { cardReducer } from './reducer/card-reducer';

const store = configureStore({
  reducer: {
    profile: profileReducer,
    login: loginReducer,
    app: appReducer,
    cardPack: cardPackReducer,
    card: cardReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootStateType = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootStateType, unknown, Action<string>>;

export default store;
