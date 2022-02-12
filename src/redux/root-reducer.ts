import { combineReducers } from 'redux';
import { loginReducer } from './reducer/login-reducer';
import { appReducer } from './reducer/app-reducer';
import { userAccountReducer } from './reducer/userAccount-reducer';
import { packsReducer } from './reducer/packs-reducer';

const rootReducer = combineReducers({
  login: loginReducer,
  app: appReducer,
  userAccount: userAccountReducer,
  packs: packsReducer,
});

export default rootReducer;
