import { Dispatch } from 'redux';
import { setProfileDeleteData } from '../reducer/logout-reducer';
import { api } from '../../api';
import { toast } from 'react-toastify';
import { setLoginLoading } from '../reducer/login-reducer';

export const logout = () => (dispatch: Dispatch) => {
  api
    .logout()
    .then(() => {
      dispatch(setProfileDeleteData());
    })
    .catch((e) => {
      const error = e.response ? e.response.data.error : e.message;
      toast.error(error);
    })
    .finally(() => {
      dispatch(setLoginLoading(false));
    });
};
