import { MePutRequestType, profileApi } from '../../api';
import { updateProfileData } from '../reducer/profile-reducer';
import { Dispatch } from 'redux';

export const updateProfileInfo = (data: MePutRequestType) => async (dispatch: Dispatch) => {
  try {
    const response = await profileApi.mePut(data);
    let { name, avatar } = response.data.updatedUser;
    dispatch(updateProfileData({ text: name, avatar }));
  } catch (err) {
    //todo error
  } finally {
    // todo dispatch app loading (false)
  }
};
/*
//Logout thunk
export const logout = () => async (dispatch: Dispatch) => {
  try {
    await logoutApi.logout();
    dispatch(setProfileDeleteData());
    /!*dispatch(setIsLoggedInAC(false)); *!/ //todo change name of action creator from Login
  } catch (err) {
    //todo error
  } finally {
    // todo dispatch app loading (false)
  }
};*/
