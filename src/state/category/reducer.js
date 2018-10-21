import * as categoryActions from './actionTypes';

const initialState = {
    categories: [],
    count: 0
}

const fetchCategoriesSuccess = (state, action) => {
    return {
        ...state,
        categories: action.payload.categories,
        count: action.payload.categories_count
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case categoryActions.FETCH_CATEGORIES_SUCCESS: return fetchCategoriesSuccess(state, action)
        default: return state;
    }
}

export default reducer;
