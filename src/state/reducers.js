import { combineReducers } from 'redux';
import uiReducer from './ui/reducer';
import userReducer from './user/reducer';
import categoryReducer from './category/reducer';
import questionReducer from './question/reducer';
import suggestionReducer from './suggestion/reducer';

const reducers = combineReducers({
    ui: uiReducer,
    user: userReducer,
    category: categoryReducer,
    question: questionReducer,
    suggestion: suggestionReducer
});

export default reducers;
