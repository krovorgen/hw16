import { api, MePutRequestType } from '@/api/api';
import { updateProfileData } from '../reducer/profile-reducer';
import { catchHandler } from '@/helpers/catchHandler';
import { AppDispatch } from '../store';

export const updateProfileInfo = (data: MePutRequestType) => (dispatch: AppDispatch) => {
  api
    .mePut(data)
    .then(({ data }) => {
      let { name, avatar } = data.updatedUser;
      dispatch(updateProfileData({ text: name, avatar }));
    })
    .catch(catchHandler);
};
