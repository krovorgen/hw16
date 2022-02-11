import { api, MePutRequestType } from '../../api';
import { updateProfileData } from '../reducer/profile-reducer';
import { Dispatch } from 'redux';
import { toast } from 'react-toastify';
import { setLoginLoading } from '../reducer/login-reducer';

export const updateProfileInfo = (data: MePutRequestType) => (dispatch: Dispatch) => {
  api
    .mePut(data)
    .then((response) => {
      let { name, avatar } = response.data.updatedUser;
      dispatch(updateProfileData({ text: name, avatar }));
    })

    .catch((e) => {
      const error = e.response ? e.response.data.error : e.message;
      toast.error(error);
    })
    .finally(() => {
      dispatch(setLoginLoading(false));
    });
};
