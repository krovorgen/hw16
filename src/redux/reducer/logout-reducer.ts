import axios from 'axios';
import { logoutApi } from '../../api';

export const initialState: InitialStateType = {
  isLoggedIn: false,
  error: null,
  status: 'idle',
};

//Thunks
export const logOut = () => async (dispatch: Dispatch) => {
  try {
    await logoutApi.LogOut();
    dispatch(setProfileDeleteData());
    dispatch(setIsLoggedInAC(false));
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      dispatch(setProfileError(err.response.data.error));
    }
  } finally {
    // dispatch loading (false)
  }
};

type InitialStateType = {
  isLoggedIn: boolean;
  error: string | null;
  status: 'loading' | 'succeeded' | 'failed' | 'idle';
};
