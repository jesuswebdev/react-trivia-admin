import { combineReducers } from 'redux';
import uiReducer from './ui/reducer';
import userReducer from './user/reducer';
import categoryReducer from './category/reducer';

const reducers = combineReducers({
    ui: uiReducer,
    user: userReducer,
    category: categoryReducer
});

export default reducers;
