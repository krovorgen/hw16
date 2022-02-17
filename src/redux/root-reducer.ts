import { combineReducers } from 'redux';
import profileReducer from './reducer/profile-reducer';
import { loginReducer } from './reducer/login-reducer';
import { appReducer } from './reducer/app-reducer';
import { cardPackReducer } from './reducer/card-pack-reducer';
import { cardReducer } from './reducer/card-reducer';

const rootReducer = combineReducers({
  profile: profileReducer,
  login: loginReducer,
  app: appReducer,
  cardPack: cardPackReducer,
  card: cardReducer,
});

export default rootReducer;
