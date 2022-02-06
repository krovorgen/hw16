import axios from 'axios';

const BASE_URL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/';

const instance = axios.create({
  baseURL: BASE_URL,
});

export const api = {
  checkPing(frontTime: number) {
    return instance.post(`ping`, { frontTime });
  },
  authForgot(email: string) {
    return instance.post(`auth/forgot`, {
      email,
      from: 'friday-super-team <friday-super-team@yandex.by>',
      message: `
      <div style="background-color: #0f0; padding: 15px">
        password recovery link:
        <a href='${BASE_URL}/set-new-password/$token$'>link</a>
	    </div>`,
    });
  },
  setNewPassword(password: string, resetPasswordToken: string) {
    return instance.post(`auth/set-new-password`, { password, resetPasswordToken });
  },
};
