import * as categoryActions from './actionTypes';

const initialState = {
  categories: [],
  count: 0
};

const fetchCategoriesSuccess = (state, action) => {
  return {
    ...state,
    categories: action.payload.categories,
    count: action.payload.categories_count
  };
};

const createCategory = (state, action) => {
  return {
    ...state,
    categories: [action.payload].concat(state.categories),
    count: state.count + 1
  };
};

const deleteCategory = (state, action) => {
  return {
    ...state,
    categories: state.categories.filter(category => category._id !== action.id)
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case categoryActions.FETCH_CATEGORIES_SUCCESS:
      return fetchCategoriesSuccess(state, action);
    case categoryActions.CREATE_CATEGORY:
      return createCategory(state, action);
    case categoryActions.DELETE_CATEGORY:
      return deleteCategory(state, action);
    default:
      return state;
  }
};

export default reducer;
