import * as userActions from './actionTypes';
import * as uiLoginActions from '../ui/login/actions';
import axios from 'axios';

const loginSuccess = (userData) => {
    return {
        type: userActions.USER_LOGIN_SUCCESS,
        payload: userData
    }
}

const logout = () => {
    localStorage.removeItem('userData');
    return {
        type: userActions.USER_LOGOUT
    }
}

export const loginStart = (loginData) => dispatch => {
    dispatch(uiLoginActions.loginStart());

    axios.post('http://localhost:8080/users/login', loginData)
    .then(({data}) => {
        localStorage.setItem('userData', JSON.stringify(data));
        dispatch(loginSuccess(data));
        dispatch(uiLoginActions.loginStop());
    })
    .catch(({response: {data}}) => {
        dispatch(uiLoginActions.loginStop(data));
    });
}

export const checkAuthState = () => dispatch => {
    let storedUser = localStorage.getItem('userData');

    if (!storedUser) {
        dispatch(logout())
    }
    return loginSuccess(JSON.parse(storedUser));
}
