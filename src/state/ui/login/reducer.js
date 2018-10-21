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
        loading: false,
        error: action.payload ? true : false,
        errorMessage: action.payload ? action.payload.message : ''
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case loginActions.LOGIN_START: return loginStart(state, action)
        case loginActions.LOGIN_STOP: return loginStop(state, action)
        default: return state;
    }
}

export default reducer;
