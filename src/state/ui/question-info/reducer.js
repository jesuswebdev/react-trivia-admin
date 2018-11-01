import * as actionTypes from './actionTypes';

const initialState = {
	loading: false,
	error: false,
	errorMessage: ''
};

const startLoadingQuestionInfo = (state, action) => {
	return {
		...state,
		loading: true,
		error: false,
		errorMessage: ''
	}
}

const finishLoadingQuestionInfo = (state, action) => {
	return {
		...state,
		loading: false
	}
}

const errorLoadingQuestionInfo = (state, action) => {
	console.log(action);
	return {
		...state,
		loading: false,
		error: true,
		errorMessage: action.payload.message
	}
}

const reducer = (state = initialState, action) => {
	switch(action.type) {
		case actionTypes.START_LOADING_QUESTION_INFO: return startLoadingQuestionInfo(state, action);
		case actionTypes.FINISH_LOADING_QUESTION_INFO: return finishLoadingQuestionInfo(state, action);
		case actionTypes.ERROR_LOADING_QUESTION_INFO: return errorLoadingQuestionInfo(state, action);
		default: return state;
	}
}

export default reducer;