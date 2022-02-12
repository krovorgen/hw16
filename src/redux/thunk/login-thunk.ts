import { AppDispatch } from '../store';
import { api } from '../../api';
import { setIsLoggedIn, setLoginLoading } from '../reducer/login-reducer';
import { toast } from 'react-toastify';
import { catchHandler } from '../../helpers/catchHandler';
import { setUserAccountData } from '../reducer/userAccount-reducer';

export const loginTC = (email: string, password: string, rememberMe: boolean) => (dispatch: AppDispatch) => {
  dispatch(setLoginLoading(true));

  api
    .login(email, password, rememberMe)
    .then((response) => {
      dispatch(setIsLoggedIn(true));
      dispatch(setUserAccountData({ _id: response.data._id, name: response.data.name }));
      toast.success('You have successfully logged in');
    })
    .catch(catchHandler)
    .finally(() => {
      dispatch(setLoginLoading(false));
    });
};
