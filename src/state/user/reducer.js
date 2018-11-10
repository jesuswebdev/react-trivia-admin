import * as userActions from './actionTypes';

const initialState = {
  email: null,
  id: null,
  name: null,
  token: null
};

const userLoginSuccess = (state, action) => {
  let data = action.payload;
  localStorage.setItem('userData', JSON.stringify(data));
  return {
    ...state,
    email: data.user.email,
    id: data.user.id,
    name: data.user.name,
    token: data.token
  };
};

const logout = (state, action) => {
  return initialState;
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case userActions.USER_LOGIN_SUCCESS:
      return userLoginSuccess(state, action);
    case userActions.USER_LOGOUT:
      return logout(state, action);
    default:
      return state;
  }
};

export default reducer;
