import axios from 'axios';

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

export const getAuthHeaders = () => {
  let user = JSON.parse(localStorage.getItem('userData'));
  const { token } = user || {};
  if (!token) {
    return undefined;
  }
  return {
    Authorization: 'Bearer ' + token
  };
};

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

export { axiosInstance as http };
