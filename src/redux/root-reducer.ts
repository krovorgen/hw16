import { combineReducers } from 'redux';
import { loginReducer } from './reducer/login-reducer';
import { appReducer } from './reducer/app-reducer';
import { userAccountReducer } from './reducer/userAccount-reducer';

const rootReducer = combineReducers({
  login: loginReducer,
  app: appReducer,
  userAccount: userAccountReducer,
});

export default rootReducer;
