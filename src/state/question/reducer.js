import * as questionActions from './actionTypes';

const initialState = {

}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case questionActions.SAVE_QUESTION_SUCCESS: {
            return state;
        }
        default: return state;
    }
}

export default reducer;
