import { Dispatch } from 'redux';
import { logoutApi } from '../../api';
import { setProfileDeleteData } from '../reducer/logout-reducer';

export const logout = () => async (dispatch: Dispatch) => {
  try {
    await logoutApi.logout();
    dispatch(setProfileDeleteData());
  } catch (err) {
    //todo error
  } finally {
    // todo dispatch app loading (false)
  }
};
