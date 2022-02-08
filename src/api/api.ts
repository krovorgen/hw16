import axios, { AxiosResponse } from 'axios';

const BASE_URL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/';

const instance = axios.create({
  baseURL: BASE_URL,
});

export const api = {
  checkPing(frontTime: number) {
    return instance.post(`ping`, { frontTime });
  },
  login(email: string, password: string, rememberMe: boolean) {
    return instance.post<LoginRequestType, AxiosResponse<LoginResponseType>>('auth/login', {
      email,
      password,
      rememberMe,
    });
  },
};

// types
type LoginRequestType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

type LoginResponseType = {
  _id: string;
  email: string;
  name: string;
  avatar?: string;
  publicCardPacksCount: number;
  created: Date;
  updated: Date;
  isAdmin: boolean;
  verified: boolean;
  rememberMe: boolean;
  error?: string;
};
