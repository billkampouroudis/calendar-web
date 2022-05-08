import { safelyParseJson } from './safelyParseJson';
import { getToken } from './jwt';
import userApi from '../api/userApi';

export const storeUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const getUser = () => {
  const user = localStorage.getItem('user');
  return safelyParseJson(user);
};

export const removeUser = () => {
  localStorage.removeItem('user');
};

export const isUserAuthenticated = async () => {
  const token = getToken();

  if (token) {
    try {
      const me = await userApi.me();
      return Promise.resolve(me);
    } catch (err) {
      return Promise.reject();
    }
  }

  return Promise.reject();
};
