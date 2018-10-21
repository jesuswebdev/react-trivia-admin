import * as categoryActions from './actionTypes';
import * as uiNewQuestionActions from '../ui/new-question/actions';
import axios from 'axios';

export const fetchCategories = () => dispatch => {

    dispatch(uiNewQuestionActions.loadingCategoriesStart());

    let {token} = JSON.parse(localStorage.getItem('userData'));

    axios.get('http://localhost:8080/category', {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(({data}) => {
        dispatch(fetchCategoriesSuccess(data));
        dispatch(uiNewQuestionActions.loadingCategoriesFinish());
    })
    .catch(({response}) => {
        console.log(response)
    })
}

const fetchCategoriesSuccess = (data) => {
    return {
        type: categoryActions.FETCH_CATEGORIES_SUCCESS,
        payload: data
    }
}

// const fetchCategoriesFail = (data) => {
//     return {
//         type: categoryActions.FETCH_CATEGORIES_FAIL
//     }
// }
