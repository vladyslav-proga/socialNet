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
export const logInSuccess = ( token, userId, userName ) => {
    return {
        type: actionTypes.LOG_IN_SUCCESS,
        token: token,
        userId: userId,
        userName: userName
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
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

export const authCheckTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000)
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
                localStorage.setItem('userName', response.data.userName);
                dispatch(logInSuccess(response.data.token, response.data.userId, response.data.userName));
                dispatch(authCheckTimeout(response.data.expiresIn));
        })
        .catch(error => {
            dispatch(authFail(error.response.data.message));
        });
    }
}

export const resetUserData = (token, userId, userName) => {
    return {
        type: actionTypes.RESET_USERDATA,
        token: token,
        userId: userId,
        userName: userName
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const experationDate = new Date(localStorage.getItem('expirationDate'));
            if (experationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem('userId');
                const userName = localStorage.getItem('userName');
                dispatch(resetUserData(token, userId, userName));
                dispatch(authCheckTimeout((experationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    };
};

