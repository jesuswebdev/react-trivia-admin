import axios from 'axios';
import { GUEST_ADMIN_TOKEN, API_URL } from '../config';

export const getAuthState = () => {
  let user = JSON.parse(localStorage.getItem('userData'));
  if (!user) {
    return undefined;
  }
  return {
    user: {
      name: user.user.name,
      email: user.user.email,
      id: user.user.id,
      token: user.token
    }
  };
};

export const getAuthHeaders = token => {
  return {
    Authorization: 'Bearer ' + token || GUEST_ADMIN_TOKEN
  };
};

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: 'Bearer ' + GUEST_ADMIN_TOKEN
  }
});

export { axiosInstance as http };
