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
  getPack(data?: GetPackRequest) {
    return instance.get<GetPackResponse>(`cards/pack`, { params: data });
  },
  postPack(cardsPack?: PostPackRequest) {
    return instance.post(`cards/pack`, { cardsPack });
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

type GetPackRequest = {
  packName?: string;
  min?: string;
  max?: string;
  sortPacks?: string;
  page?: number;
  pageCount?: number;
  user_id?: string;
};

export type GetPackResponse = {
  cardPacks: CardPacksItem[];
  cardPacksTotalCount: number;
  maxCardsCount: number;
  minCardsCount: number;
  page: number;
  pageCount: number;
};

export type CardPacksItem = {
  _id: string;
  user_id: string;
  name: string;
  path: string;
  cardsCount: number;
  grade: number;
  shots: number;
  rating: number;
  type: string;
  created: string;
  updated: string;
  __v: number;
};

export type PostPackRequest = {
  name?: string; // если не отправить будет таким
  path?: string; // если не отправить будет такой
  grade?: number; // не обязателен
  shots?: number; // не обязателен
  rating?: number; // не обязателен
  deckCover?: string; // не обязателен
  private?: boolean; // если не отправить будет такой
  type?: string; // если не отправить будет таким
};
