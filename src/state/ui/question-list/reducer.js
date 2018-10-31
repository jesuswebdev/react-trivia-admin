import * as actionTypes from './actionTypes';

const initialState = {
	loading: false,
	error: false,
	errorMessage: '',
	loadingNextQuestions: false,
	errorNextQuestions: false,
	errorMessageNextQuestions: '',
	loadingStats: false,
	errorStats: false,
	errorMessageStats: ''
};

const startLoadingQuestions = (state, action) => {
	return {
		...state,
		loading: true,
		error: false,
		errorMessage: ''
	}
}

const finishLoadingQuestions = (state, action) => {
	return {
		...state,
		loading: false
	}
}

const errorLoadingQuestions = (state, action) => {
	return {
		...state,
		loading: false,
		error: true,
		errorMessage: action.payload.message
	}
}

const startLoadingNextQuestions = (state, action) => {
	return {
		...state,
		loadingNextQuestions: true,
		errorNextQuestions: false,
		errorMessageNextQuestions: ''
	}
}

const finishLoadingNextQuestions = (state, action) => {
	return {
		...state,
		loadingNextQuestions: false
	}
}

const errorLoadingNextQuestions = (state, action) => {
	return {
		...state,
		loadingNextQuestions: false,
		errorNextQuestions: true,
		errorMessageNextQuestions: action.payload.message
	}
}

const startLoadingStats = (state, action) => {
	return {
		...state,
		loadingStats: true,
		errorStats: false,
		errorMessageStats: ''
	}
}

const finishLoadingStats = (state, action) => {
	return {
		...state,
		loadingStats: false
	}
}

const errorLoadingStats = (state, action) => {
	return {
		...state,
		loadingStats: false,
		errorStats: true,
		errorMessageStats: action.payload.message
	}
}

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case actionTypes.START_LOADING_QUESTIONS: return startLoadingQuestions(state, action);
		case actionTypes.FINISH_LOADING_QUESTIONS: return finishLoadingQuestions(state, action);
		case actionTypes.ERROR_LOADING_QUESTIONS: return errorLoadingQuestions(state, action);
		case actionTypes.START_LOADING_NEXT_QUESTIONS: return startLoadingNextQuestions(state, action);
		case actionTypes.FINISH_LOADING_NEXT_QUESTIONS: return finishLoadingNextQuestions(state, action);
		case actionTypes.ERROR_LOADING_NEXT_QUESTIONS: return errorLoadingNextQuestions(state, action);
		case actionTypes.START_LOADING_STATS: return startLoadingStats(state, action);
		case actionTypes.FINISH_LOADING_STATS: return finishLoadingStats(state, action);
		case actionTypes.ERROR_LOADING_STATS: return errorLoadingStats(state, action);
		default: return state;
	}
}

export default reducer;