import axios, { AxiosResponse } from 'axios';

const BASE_URL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/';

const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const api = {
  checkPing(frontTime: number) {
    return instance.post(`ping`, { frontTime });
  },
  authForgot(email: string) {
    return instance.post<AuthForgotRT>(`auth/forgot`, {
      email,
      from: 'friday-super-team <friday-super-team@yandex.by>',
      message: `
      <div style="background-color: #0f0; padding: 15px">
        password recovery link:
        <a href='https://hw16.vercel.app/set-new-password/$token$'>link</a>
	    </div>`,
    });
  },
  setNewPassword(password: string, resetPasswordToken: string) {
    return instance.post<AuthForgotRT>(`auth/set-new-password`, { password, resetPasswordToken });
  },
  login(email: string, password: string, rememberMe: boolean) {
    return instance.post<LoginRequestType, AxiosResponse<LoginResponseType>>('auth/login', {
      email,
      password,
      rememberMe,
    });
  },
  logout() {
    return instance.delete<AuthForgotRT>(`auth/me`);
  },
  register(email: string, password: string) {
    return instance.post(`auth/register`, { email, password });
  },
  authMe() {
    return instance.post(`auth/me`, {});
  },
  getAllPacks() {
    return instance.get<GetAllPacksResponseType>('cards/pack');
  },
};

type AuthForgotRT = {
  info: string;
  error: string;
};
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

export type GetAllPacksResponseType = {
  cardPacks: Array<PackType>;
  cardPacksTotalCount: number;
  maxCardsCount: number;
  minCardsCount: number;
  page: number;
  pageCount: number;
};

export type PackType = {
  cardsCount: number;
  created: string;
  deckCover: string;
  grade: number;
  more_id: string;
  name: string;
  path: string;
  private: boolean;
  rating: number;
  shots: number;
  type: string;
  updated: string;
  user_id: string;
  __v: number;
  _id: string;
};
