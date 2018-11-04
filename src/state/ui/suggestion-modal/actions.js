import * as actionTypes from './actionTypes';

export const uiShowSuggestionModal = () => {
  return {
    type: actionTypes.UI_SHOW_SUGGESTION_MODAL
  };
};

export const uiCloseSuggestionModal = () => {
  return {
    type: actionTypes.UI_CLOSE_SUGGESTION_MODAL
  };
};
