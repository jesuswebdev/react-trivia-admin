import * as loginActions from './actionTypes';

const initialState = {
    loading: false,
    error: false,
    errorMessage: ''
}

const loginStart = (state, action) => {
    return {
        ...state,
        loading: true,
        error: false,
        errorMessage: ''
    };
}

const loginStop = (state, action) => {
    return {
        ...state,
        loading: false
    }
}

const loginError = (state, action) => {
    return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.payload.message
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case loginActions.UI_LOGIN_START: return loginStart(state, action);
        case loginActions.UI_LOGIN_STOP: return loginStop(state, action);
        case loginActions.UI_LOGIN_ERROR: return loginError(state, action);
        default: return state;
    }
}

export default reducer;
