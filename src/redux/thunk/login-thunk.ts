import { AppDispatch } from '../store';
import { api } from '../../api';
import { setIsLoggedIn, setLoginLoading } from '../reducer/login-reducer';
import { toast } from 'react-toastify';

export const loginTC = (email: string, password: string, rememberMe: boolean) => (dispatch: AppDispatch) => {
  dispatch(setLoginLoading(true));

  api
    .login(email, password, rememberMe)
    .then((res) => {
      dispatch(setIsLoggedIn(true));
      toast.success('You have successfully logged in');
    })
    .catch((e) => {
      const error = e.response ? e.response.data.error : e.message;
      toast.error(error);
    })
    .finally(() => {
      dispatch(setLoginLoading(false));
    });
};
