import axios, { AxiosResponse } from 'axios';

const BASE_URL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/';

const instance = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
  /*  headers: {},*/
});

export const api = {
  checkPing(frontTime: number) {
    return instance.post(`ping`, { frontTime });
  },
};

export const logoutApi = {
  logout() {
    return instance.delete<{}, AxiosResponse<InfoResponseType>>(`auth/me`);
  },
};

export const profileApi = {
  mePut(data: MePutRequestType) {
    return instance.put<MePutRequestType, AxiosResponse<MePutResponseType>>(`auth/me`, data);
  },
};

//Types
export type InfoResponseType = {
  info: string;
  error: string;
};

export type UserResponseType = {
  _id: string;
  email: string;
  name: string;
  avatar: string;
  publicCardPacksCount: number;
  created: Date;
  updated: Date;
  isAdmin: boolean;
  verified: boolean;
  rememberMe: boolean;
  error: string;
  token?: string;
};

export type MePutRequestType = {
  name?: string;
  avatar?: string;
};

export type MePutResponseType = {
  updatedUser: UserResponseType;
  error?: string;
};
