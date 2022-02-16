import { Dispatch } from 'redux';
import { api } from '../../api';
import { catchHandler } from '../../helpers/catchHandler';
import { setIsLoggedIn } from '../reducer/login-reducer';
import { changeInitializedStatusAC } from '../reducer/app-reducer';
import { authProfileData } from '../reducer/profile-reducer';

export const initializedTC = () => (dispatch: Dispatch) => {
  api
    .authMe()
    .then(({ data }) => {
      dispatch(setIsLoggedIn(true));
      dispatch(authProfileData(data));
    })
    .catch(catchHandler)
    .finally(() => dispatch(changeInitializedStatusAC(false)));
};
