import * as actionTypes from './actionTypes';
import { PAGE_ITEM_COUNT } from '../../config';

const initialState = {
	pages: [],
	currentPageNumber: 0,
	loadedPages: [],
	totalPages: 0
};

const loadFirstPageSuccess = (state, action) => {
	return {
		...state,
		pages: state.pages.concat({ number: 1, suggestions: action.payload.results }),
		currentPageNumber: 1,
		loadedPages: state.loadedPages.concat(1),
		totalPages: Math.ceil(action.payload.results_count / PAGE_ITEM_COUNT)
	};
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.LOAD_FIRST_PAGE_SUCCESS: return loadFirstPageSuccess(state, action);
		default: return state;
	}
}

export default reducer;