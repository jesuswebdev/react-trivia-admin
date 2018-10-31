import { combineReducers } from 'redux';
import loginReducer from './login/reducer';
import newQuestionReducer from './new-question/reducer';
import questionListReducer from './question-list/reducer';

const reducers = combineReducers({
    login: loginReducer,
    newQuestion: newQuestionReducer,
    questionList: questionListReducer
});

export default reducers;
