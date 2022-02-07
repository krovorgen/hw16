import { combineReducers } from 'redux';
import { profileReducer } from './reducer/profile-reducer';

const rootReducer = combineReducers({
  profile: profileReducer,
});

export default rootReducer;
