import * as newQuestionActions from './actionTypes';

const initialState = {
    loadingCategories: false,
    pending: false,
    saved: false,
    error: false,
    errorMessage: ''
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case newQuestionActions.LOADING_CATEGORIES_START: {
            return { ...state, loadingCategories: true}
        }
        case newQuestionActions.LOADING_CATEGORIES_FINISH: {
            return { ...state, loadingCategories: false }
        }
        case newQuestionActions.QUESTION_SENT_START: {
            return { ...state, pending: true, saved: false, error: false, errorMessage: '' }
        }
        case newQuestionActions.QUESTION_SENT_FINISH: {
            return { ...state, pending: false, saved: true }
        }
        case newQuestionActions.QUESTION_SENT_FAIL: {
            return { ...state, pending: false, saved: false, error: true, errorMessage: action.payload.message }
        }
        case newQuestionActions.REDIRECT_START: {
            return { ...state, saved: false }
        }
        default: return state;
    }
}

export default reducer;
