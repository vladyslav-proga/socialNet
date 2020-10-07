import axios from 'axios';

import * as actionTypes from '../actions/actionTypes';

//начало регистрации или входа
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

//Ошибка регистрации или входа
export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
};

// Успешная регистрация
export const logUpSuccess = () => {
    return {
        type: actionTypes.LOG_UP_SUCCESS
    }
};

// Успешный вход
export const logInSuccess = ( token, userId ) => {
    return {
        type: actionTypes.LOG_IN_SUCCESS,
        token: token,
        userId: userId
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const changeModToSignIn = () => {
    return {
        type: actionTypes.SWITCH_MOD_TO_SIGN_IN
    }
};

export const changeModToSignUp = () => {
    return {
        type: actionTypes.SWITCH_MOD_TO_SIGN_UP
    }
};

// функция регистрации
export const logUp = (userData) => {
    return dispatch => {
        dispatch(authStart());

        axios.post('http://localhost:5000/auth/signup', {
        fname: userData.fname,
        lname: userData.lname,
        email: userData.email,
        password: userData.password
        })
        .then(response => {
            dispatch(logUpSuccess());
            dispatch(changeModToSignIn());
        })
        .catch(error => {
            dispatch(authFail(error.response.data.message));
        });
    }
};

export const logIn = (userData) => {
    return dispatch => {
        dispatch(authStart());

        axios.post('http://localhost:5000/auth/signin', {
            email: userData.email,
            password: userData.password
        })
        .then(response => {
            const expirationTime = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('expirationDate', expirationTime);
                localStorage.setItem('userId', response.data.userId);
                dispatch(logInSuccess(response.data.token, response.data.userId));
        })
        .catch(error => {
            dispatch(authFail(error.response.data.message));
        });
    }
}


