import * as actionTypes from './actionTypes';

export const startLoadingQuestionInfo = () => {
	return {
		type: actionTypes.START_LOADING_QUESTION_INFO
	}
}

export const finishLoadingQuestionInfo = () => {
	return {
		type: actionTypes.FINISH_LOADING_QUESTION_INFO
	}
}

export const errorLoadingQuestionInfo = (error) => {
	return {
		type: actionTypes.ERROR_LOADING_QUESTION_INFO,
		payload: error
	}
}