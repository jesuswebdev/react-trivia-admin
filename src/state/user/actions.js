import * as userActions from './actionTypes';
import * as uiLoginActions from '../ui/login/actions';
import axios from 'axios';

const loginSuccess = userData => {
  return {
    type: userActions.USER_LOGIN_SUCCESS,
    payload: userData
  };
};

const logout = () => {
  localStorage.removeItem('userData');
  return {
    type: userActions.USER_LOGOUT
  };
};

export const loginStart = loginData => dispatch => {
  dispatch(uiLoginActions.loginStart());
  console.log(process.env.REACT_APP_API_URL);
  axios
    .post(`${process.env.REACT_APP_API_URL}/users/admin/login`, loginData)
    .then(({ data }) => {
      localStorage.setItem('userData', JSON.stringify(data));
      dispatch(loginSuccess(data));
      dispatch(uiLoginActions.loginStop());
    })
    .catch(({ response: { data } = {} }) => {
      dispatch(uiLoginActions.loginError(data));
    });
};

export const checkAuthState = () => dispatch => {
  let storedUser = localStorage.getItem('userData');

  if (!storedUser) {
    dispatch(logout());
  }
  return loginSuccess(JSON.parse(storedUser));
};
