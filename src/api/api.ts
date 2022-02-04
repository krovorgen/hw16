import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://neko-back.herokuapp.com/2.0',
});

export const api = {};
