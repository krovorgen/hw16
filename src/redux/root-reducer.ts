import { combineReducers } from 'redux';
import { loginReducer } from './reducer/login-reducer';
import { appReducer } from './reducer/app-reducer';
import { cardReducer } from './reducer/card-reducer';

const rootReducer = combineReducers({
  login: loginReducer,
  app: appReducer,
  card: cardReducer,
});

export default rootReducer;
