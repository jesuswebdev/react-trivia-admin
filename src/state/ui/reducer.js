import { combineReducers } from 'redux';
import loginReducer from './login/reducer';
import newQuestionReducer from './new-question/reducer';

const reducers = combineReducers({
    login: loginReducer,
    newQuestion: newQuestionReducer
});

export default reducers;
