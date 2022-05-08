import jwtDecode from 'jwt-decode';

export const storeToken = (token) => {
  localStorage.setItem('jwt', token);
};

export const getToken = () => {
  const token = localStorage.getItem('jwt');
  return token;
};

export const removeToken = () => {
  localStorage.removeItem('jwt');
};

export const isTokenActive = (token) => {
  try {
    const decodedToken = jwtDecode(token);

    if (Date.now() >= decodedToken.exp * 1000) {
      return false;
    }

    return true;
  } catch (err) {
    return false;
  }
};

export const decodeToken = (token) => jwtDecode(token);
