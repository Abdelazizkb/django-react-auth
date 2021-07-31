import {
    LOGIN_FAIL, LOGIN_SUCCESS,
    USER_LOADED_SUCCESS, USER_LOADED_FAIL,
    RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL,
    RESET_PASSWORD_CONFIRM_SUCCESS, RESET_PASSWORD_CONFIRM_FAIL,
    SIGNUP_SUCCESS, SIGNUP_FAIL,
    ACTIVATION_SUCCESS, ACTIVATION_FAIL,
    LOGOUT
} from './types'

import axios from "axios"




export const loadUser = () => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config);
        dispatch({
            type: USER_LOADED_SUCCESS,
            payload: res.data
        })
    }
    catch (err) {
        dispatch({
            type: USER_LOADED_FAIL,
        })
    }

}

export const login = (email, password) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`, body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser())
    }
    catch (err) {
        dispatch({
            type: LOGIN_FAIL,
        })
    }



}

export const resetPassword = (email) => async (dispatch) => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };


    const body = JSON.stringify({ email });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password/`, body, config);
        dispatch({
            type: RESET_PASSWORD_SUCCESS,
        })
    }
    catch (err) {
        dispatch({
            type: RESET_PASSWORD_FAIL,
        })
    }




}

export const resetPasswordConfirm = (uid, token, new_password, re_new_password) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };


    const body = JSON.stringify({ uid, token, new_password, re_new_password });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`, body, config);
        dispatch({
            type: RESET_PASSWORD_CONFIRM_SUCCESS,
        })
    }
    catch (err) {
        dispatch({
            type: RESET_PASSWORD_CONFIRM_FAIL,
        })
    }


}

export const signUp = (email, name, password, re_password) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };


    const body = JSON.stringify({ email, name, password, re_password });

    axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`, body, config)
        .then(res => {
            dispatch({
                type: SIGNUP_SUCCESS,
            })
        })

        .catch(
            err => {
                console.log(err)
                dispatch({ type: SIGNUP_FAIL, })

            })

}

export const verify = (uid, token) => async (dispatch) => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };


    const body = JSON.stringify({ uid, token });


    const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/activation/`, body, config)
        .then(
            res => { return res },
            dispatch({ type: ACTIVATION_SUCCESS })
        )
        .catch(
            err => { return err },
            dispatch({ type: ACTIVATION_FAIL })
        );




}



export const logout = () => async (dispatch) => {


    dispatch({
        type: LOGOUT,
    })

}