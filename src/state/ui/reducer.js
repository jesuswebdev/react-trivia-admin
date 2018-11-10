import { combineReducers } from 'redux';
import newQuestionReducer from './new-question/reducer';
import questionListReducer from './question-list/reducer';
import questionInfoReducer from './question-info/reducer';
import suggestionListReducer from './suggestion-list/reducer';
import suggestionModalReducer from './suggestion-modal/reducer';

const reducers = combineReducers({
  newQuestion: newQuestionReducer,
  questionList: questionListReducer,
  questionInfo: questionInfoReducer,
  suggestionList: suggestionListReducer,
  suggestionModal: suggestionModalReducer
});

export default reducers;
