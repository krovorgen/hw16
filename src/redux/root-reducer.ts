import { combineReducers } from 'redux';
import { loginReducer } from './reducer/login-reducer';
import { appReducer } from './reducer/app-reducer';
import { cardPackReducer } from './reducer/card-pack-reducer';

const rootReducer = combineReducers({
  login: loginReducer,
  app: appReducer,
  cardPack: cardPackReducer,
});

export default rootReducer;
