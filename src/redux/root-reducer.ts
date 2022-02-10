import { combineReducers } from 'redux';
import logoutReducer from './reducer/logout-reducer';
import profileReducer from './reducer/profile-reducer';

export const rootReducer = combineReducers({
  profile: profileReducer,
  logout: logoutReducer,
});
