import * as actionTypes from './actionTypes';

export const startLoadingSuggestions = () => {
  return {
    type: actionTypes.START_LOADING_SUGGESTIONS
  };
};

export const finishLoadingSuggestions = () => {
  return {
    type: actionTypes.FINISH_LOADING_SUGGESTIONS
  };
};

export const errorLoadingSuggestions = error => {
  return {
    type: actionTypes.ERROR_LOADING_SUGGESTIONS,
    error
  };
};

export const startLoadingNextSuggestions = () => {
  return {
    type: actionTypes.START_LOADING_NEXT_SUGGESTIONS
  };
};

export const finishLoadingNextSuggestions = () => {
  return {
    type: actionTypes.FINISH_LOADING_NEXT_SUGGESTIONS
  };
};

export const errorLoadingNextSuggestions = error => {
  return {
    type: actionTypes.ERROR_LOADING_NEXT_SUGGESTIONS,
    error
  };
};
