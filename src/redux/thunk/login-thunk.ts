import { AppDispatch } from '../store';
import { api } from '../../api';
import { setIsLoggedIn, setLoginLoading } from '../reducer/login-reducer';
import { toast } from 'react-toastify';
import { catchHandler } from '../../helpers/catchHandler';
import { authProfileData } from '../reducer/profile-reducer';

export const loginTC = (email: string, password: string, rememberMe: boolean) => (dispatch: AppDispatch) => {
  dispatch(setLoginLoading(true));

  api
    .login(email, password, rememberMe)
    .then(({ data }) => {
      dispatch(setIsLoggedIn(true));
      dispatch(authProfileData(data));
      toast.success('You have successfully logged in');
    })
    .catch(catchHandler)
    .finally(() => {
      dispatch(setLoginLoading(false));
    });
};
