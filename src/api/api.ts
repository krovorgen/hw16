import axios, { AxiosResponse } from 'axios';

const BASE_URL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/';

const instance = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
  headers: {},
});

export const api = {
  checkPing(frontTime: number) {
    return instance.post(`ping`, { frontTime });
  },
};

export const logoutApi = {
  LogOut() {
    return instance.delete<{}, AxiosResponse<InfoResponseType>>(`auth/me`);
  },
};

export type InfoResponseType = {
  info: string;
  error: string;
};
