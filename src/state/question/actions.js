import * as questionActions from './actionTypes';
import * as uiNewQuestionActions from '../ui/new-question/actions';
import axios from 'axios';

export const saveQuestionStart = (question) => dispatch => {

    console.log(question);

    dispatch(uiNewQuestionActions.questionSentStart());

    const {token} = JSON.parse(localStorage.getItem('userData'));
    axios({
        method: 'post',
        url: 'http://localhost:8080/questions',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        data: question
    })
    .then(({data}) => {
        console.log(data);
        dispatch(uiNewQuestionActions.questionSentFinish());
    })
    .catch(({response: {data}}) => {
        console.log(data);
        dispatch(uiNewQuestionActions.questionSentFail(data));
    });
}

export const saveQuestionSuccess = (question) => {
    return {
        type: questionActions.SAVE_QUESTION_SUCCESS
    }
}

export const saveQuestionFail = (error) => {
    return {
        type: questionActions.SAVE_QUESTION_FAIL,
        error
    }
}
