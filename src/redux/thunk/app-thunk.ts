import { Dispatch } from 'redux';
import { api } from '../../api';
import { catchHandler } from '../../helpers/catchHandler';
import { setIsLoggedIn } from '../reducer/login-reducer';
import { changeInitializedStatusAC } from '../reducer/app-reducer';

export const initializedTC = () => (dispatch: Dispatch) => {
  api
    .authMe()
    .then(() => {
      dispatch(setIsLoggedIn(true));
    })
    .catch(catchHandler)
    .finally(() => dispatch(changeInitializedStatusAC(false)));
};
