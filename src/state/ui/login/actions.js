import * as loginActions from "./actionTypes";

export const loginStart = () => {
  return {
    type: loginActions.UI_LOGIN_START
  };
};

export const loginStop = () => {
  return {
    type: loginActions.UI_LOGIN_STOP
  };
};

export const loginError = (error) => {
	return {
		type: loginActions.UI_LOGIN_ERROR,
		payload: error
	}
}
