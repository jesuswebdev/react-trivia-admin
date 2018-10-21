import * as loginActions from "./actionTypes";

export const loginStart = () => {
  return {
    type: loginActions.LOGIN_START
  };
};

export const loginStop = (error) => {
  return {
    type: loginActions.LOGIN_STOP,
    payload: error
  };
};
