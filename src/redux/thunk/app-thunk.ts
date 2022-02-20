import { api } from '@/api/api';
import { catchHandler } from '@/helpers/catchHandler';
import { setIsLoggedIn } from '../reducer/login-reducer';
import { changeInitializedStatusAC } from '../reducer/app-reducer';
import { authProfileData } from '../reducer/profile-reducer';
import { AppDispatch } from '../store';

export const initializedTC = () => (dispatch: AppDispatch) => {
  api
    .authMe()
    .then(({ data }) => {
      dispatch(setIsLoggedIn(true));
      dispatch(authProfileData(data));
    })
    .catch(catchHandler)
    .finally(() => dispatch(changeInitializedStatusAC(false)));
};
