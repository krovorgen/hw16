import { combineReducers } from 'redux';
import { loginReducer } from './reducer/login-reducer';
import { appReducer } from './reducer/app-reducer';

const rootReducer = combineReducers({
  login: loginReducer,
  app: appReducer,
});

export default rootReducer;
