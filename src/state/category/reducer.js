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

const editCategorySuccess = (state, action) => {
  let [edited] = state.categories.filter(
    category => category._id === action.payload.categoryId
  );
  edited.title = action.payload.name;

  return {
    ...state,
    categories: state.categories.map(category => {
      if (category._id !== action.payload.categoryId) {
        return category;
      } else {
        return edited;
      }
    })
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
    case categoryActions.EDIT_CATEGORY_SUCCESS:
      return editCategorySuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
