import { api, MePutRequestType } from '../../api';
import { updateProfileData } from '../reducer/profile-reducer';
import { Dispatch } from 'redux';
import { catchHandler } from '../../helpers/catchHandler';

export const updateProfileInfo = (data: MePutRequestType) => (dispatch: Dispatch) => {
  api
    .mePut(data)
    .then(({ data }) => {
      let { name, avatar } = data.updatedUser;
      dispatch(updateProfileData({ text: name, avatar }));
    })
    .catch(catchHandler);
};
