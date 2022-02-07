import { logoutApi, MePutRequestType, profileApi, UserResponseType } from '../../api';
import { Dispatch } from 'redux';
import axios from 'axios';

const initialState: profileInitialStateType = {
  _id: '',
  email: '',
  name: '',
  avatar: '',
  publicCardPacksCount: 0,
  isAdmin: false,
  verified: false,
  rememberMe: false,
  error: '',
  token: '',
  created: null,
  updated: null,
};

export const profileReducer = (
  state: InitialStateType = initialState,
  action: ProfileActionsType
): InitialStateType => {
  switch (action.type) {
    case 'PROFILE/SET-PROFILE-DATA':
      return { ...state, ...action.data };
    case 'PROFILE/UPDATE-PROFILE-DATA':
      return { ...state, name: action.data.name, avatar: action.data.avatar };
    case 'PROFILE/SET-PROFILE-ERROR':
      return { ...state, error: action.error };
    case 'PROFILE/SET-PROFILE-DELETE-DATA':
      return initialState;
    default:
      return state;
  }
};

//Action creators
export const setProfileData = (data: profileInitialStateType) => {
  return { type: 'PROFILE/SET-PROFILE-DATA', data } as const;
};
export const updateProfileData = (data: UserResponseType) => {
  return { type: 'PROFILE/UPDATE-PROFILE-DATA', data } as const;
};
export const setProfileError = (error: string) => {
  return { type: 'PROFILE/SET-PROFILE-ERROR', error } as const;
};
export const setProfileDeleteData = () => {
  return { type: 'PROFILE/SET-PROFILE-DELETE-DATA' } as const;
};

//Thunks creator
export const updateProfileInfo = (data: MePutRequestType) => async (dispatch: Dispatch) => {
  try {
    const response = await profileApi.mePut(data);
    dispatch(updateProfileData(response.data.updatedUser));
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      dispatch(setProfileError(err.response.data.error));
    }
  } finally {
    //dispatch app loading false
  }
};

export const logoutTC = () => async (dispatch: Dispatch) => {
  try {
    await logoutApi.LogOut();
    dispatch(setProfileDeleteData());
    /*dispatch(setIsLoggedInAC(false)); */ //todo change name of action creator from Login
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      dispatch(setProfileError(err.response.data.error));
    }
  } finally {
    // todo dispatch loading (false)
  }
};

//Types
type ProfileActionsType =
  | ReturnType<typeof setProfileData>
  | ReturnType<typeof updateProfileData>
  | ReturnType<typeof setProfileError>
  | ReturnType<typeof setProfileDeleteData>;

export type profileInitialStateType = {
  _id: string;
  email: string;
  name: string;
  avatar: string;
  publicCardPacksCount: number;
  token?: string;
  created: Date | null;
  updated: Date | null;
  isAdmin: boolean;
  verified: boolean;
  rememberMe: boolean;
  error: string;
};

type InitialStateType = typeof initialState;
