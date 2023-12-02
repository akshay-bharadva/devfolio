import {ACTIONS_CONSTANTS} from "../constants/actionTypes";
import * as api from '../api/index';

const { AUTH } = ACTIONS_CONSTANTS;

export const signin = (formData, history) => async (dispatch) => {
    try {
       const { data } = await api.signin(formData);
        dispatch({type: AUTH, data});
        history.push('/');
    } catch (err) {
        console.log(err, 'error from signin action');
    }
}

export const signup = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signup(formData);
        dispatch({type: AUTH, data});
        history.push('/');
    } catch (err) {
        console.log(err, 'error from signup action');
    }
}
