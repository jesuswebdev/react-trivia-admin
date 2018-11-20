import * as userActions from './actionTypes';

export const loginSuccess = userData => {
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

export const checkAuthState = () => dispatch => {
  let storedUser = localStorage.getItem('userData');

  if (!storedUser) {
    dispatch(logout());
  }
  return loginSuccess(JSON.parse(storedUser));
};
