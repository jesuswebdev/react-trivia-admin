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
  const { token } = JSON.parse(localStorage.getItem('userData'));
  return {
    Authorization: 'Bearer ' + token
  };
};

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: getAuthHeaders()
});
