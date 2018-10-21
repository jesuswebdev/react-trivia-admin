import * as newQuestionActions from './actionTypes';

export const loadingCategoriesStart = () => {
    return {
        type: newQuestionActions.LOADING_CATEGORIES_START
    }
}

export const loadingCategoriesFinish = () => {
    return {
        type: newQuestionActions.LOADING_CATEGORIES_FINISH
    }
}

export const questionSentStart = () => {
    return {
        type: newQuestionActions.QUESTION_SENT_START
    }
}

export const questionSentFinish = () => {
    return {
        type: newQuestionActions.QUESTION_SENT_FINISH
    }
}

export const questionSentFail = (error) => {
    return {
        type: newQuestionActions.QUESTION_SENT_FAIL,
        payload: error
    }
}

export const redirectStart = () => {
    return {
        type: newQuestionActions.REDIRECT_START
    }
}
