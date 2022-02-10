import { combineReducers } from 'redux';
import logoutReducer from './reducer/logout-reducer';
import profileReducer from './reducer/profile-reducer';
import { loginReducer } from './reducer/login-reducer';

const rootReducer = combineReducers({
  profile: profileReducer,
  logout: logoutReducer,
  login: loginReducer,
});

export default rootReducer;
