import * as actionTypes from './actionTypes';

const initialState = {
  loading: false,
  error: false,
  errorMessage: '',
  loadingNextSuggestions: false,
  errorNextSuggestions: false,
  errorMessageNextSuggestions: ''
};

const startLoadingSuggestions = (state, action) => {
  return {
    ...state,
    loading: true,
    error: false,
    errorMessage: ''
  };
};

const finishLoadingSuggestions = (state, action) => {
  return {
    ...state,
    loading: false
  };
};

const errorLoadingSuggestions = (state, action) => {
  return {
    ...state,
    loading: false,
    errorMessage: action.error.message
  };
};

const startLoadingNextSuggestions = (state, action) => {
  return {
    ...state,
    loadingNextSuggestions: true,
    errorNextSuggestions: false,
    errorMessageNextSuggestions: ''
  };
};

const finishLoadingNextSuggestions = (state, action) => {
  return {
    ...state,
    loadingNextSuggestions: false
  };
};

const errorLoadingNextSuggestions = (state, action) => {
  return {
    ...state,
    loadingNextSuggestions: false,
    errorMessageNextSuggestions: action.error.message
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.START_LOADING_SUGGESTIONS:
      return startLoadingSuggestions(state, action);
    case actionTypes.FINISH_LOADING_SUGGESTIONS:
      return finishLoadingSuggestions(state, action);
    case actionTypes.ERROR_LOADING_SUGGESTIONS:
      return errorLoadingSuggestions(state, action);
    case actionTypes.START_LOADING_NEXT_SUGGESTIONS:
      return startLoadingNextSuggestions(state, action);
    case actionTypes.FINISH_LOADING_NEXT_SUGGESTIONS:
      return finishLoadingNextSuggestions(state, action);
    case actionTypes.ERROR_LOADING_NEXT_SUGGESTIONS:
      return errorLoadingNextSuggestions(state, action);
    default:
      return state;
  }
};

export default reducer;
