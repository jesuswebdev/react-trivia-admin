import * as actionTypes from './actionTypes';

const initialState = {
  active: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UI_SHOW_SUGGESTION_MODAL:
      return { active: true };
    case actionTypes.UI_CLOSE_SUGGESTION_MODAL:
      return { active: false };
    default:
      return state;
  }
};

export default reducer;
