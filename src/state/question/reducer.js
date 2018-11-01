import * as questionActions from './actionTypes';
import { PAGE_ITEM_COUNT } from '../../config';

const initialState = {
	pages: [],
	currentPage: null,
	totalPages: 0,
	loadedPages: [],
	currentPageNumber: 0,
	stats: null,
	questionInfo: null
}

const loadFirstPageSuccess = (state, action) => {
	let page = { number: 1, questions: action.payload.results };
	return {
		...state,
		pages: state.pages.concat(page),
		currentPageNumber: 1,
		currentPage: page,
		totalPages: Math.ceil(action.payload.results_count/PAGE_ITEM_COUNT),
		loadedPages: state.loadedPages.concat(1)
	}
}

const setPageNumber = (state, action) => {
	return {
		...state,
		currentPageNumber: action.payload
	}
}

const loadPageSuccess = (state, action) => {
	let page = { number: action.payload.number, questions: action.payload.results };
	return {
		...state,
		pages: state.pages.concat(page),
		currentPageNumber: action.payload.number,
		currentPage: page,
		loadedPages: state.loadedPages.concat(action.payload.number).sort((a, b) => a - b)
	};
}

const nextPage = (state, action) => {
	return {
		...state,
		currentPageNumber: action.payload,
		currentPage: state.pages.find(p => p.number === action.payload)
	}
}

const loadStatsSuccess = (state, action) => {
	return {
		...state,
		stats: action.payload
	}
}

const loadQuestionInfoSuccess = (state, action) => {
	return {
		...state,
		questionInfo: action.payload
	}
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case questionActions.LOAD_FIRST_PAGE_SUCCESS: return loadFirstPageSuccess(state, action);
        case questionActions.SET_PAGE_NUMBER: return setPageNumber(state, action);
        case questionActions.LOAD_PAGE_SUCCESS: return loadPageSuccess(state, action);
        case questionActions.NEXT_PAGE: return nextPage(state, action);
        case questionActions.LOAD_STATS_SUCCESS: return loadStatsSuccess(state, action);
        case questionActions.LOAD_QUESTION_INFO_SUCCESS: return loadQuestionInfoSuccess(state, action);
        default: return state;
    }
}

export default reducer;
