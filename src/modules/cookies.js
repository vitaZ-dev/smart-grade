import { Cookies } from 'react-cookie';

const cookies = new Cookies();

const setCookie = (name, value) => {
  return cookies.set(name, value, { path: '/' });
};

const getCookie = name => {
  return cookies.get(name);
};

const removeCookie = (name, options) => {
  return cookies.remove(name, { ...options });
};

export { setCookie, getCookie, removeCookie };
