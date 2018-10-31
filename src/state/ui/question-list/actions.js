import * as actionTypes from './actionTypes';

export const startLoadingQuestions = () => {
	return {
		type: actionTypes.START_LOADING_QUESTIONS
	}
}

export const finishLoadingQuestions = () => {
	return {
		type: actionTypes.FINISH_LOADING_QUESTIONS
	}
}

export const errorLoadingQuestions = (error) => {
	return {
		type: actionTypes.ERROR_LOADING_QUESTIONS,
		payload: error
	}
}

export const startLoadingNextQuestions = () => {
	return {
		type: actionTypes.START_LOADING_NEXT_QUESTIONS
	}
}

export const finishLoadingNextQuestions = () => {
	return {
		type: actionTypes.FINISH_LOADING_NEXT_QUESTIONS
	}
}

export const errorLoadingNextQuestions = (error) => {
	return {
		type: actionTypes.ERROR_LOADING_NEXT_QUESTIONS,
		payload: error
	}
}

export const startLoadingStats = () => {
	return {
		type: actionTypes.START_LOADING_STATS
	}
}

export const finishLoadingStats = () => {
	return {
		type: actionTypes.FINISH_LOADING_STATS
	}
}

export const errorLoadingStats = (error) => {
	return {
		type: actionTypes.ERROR_LOADING_STATS,
		payload: error
	}
}