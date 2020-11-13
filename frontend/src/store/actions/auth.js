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
export const logInSuccess = ( socialData ) => {
    return {
        type: actionTypes.LOG_IN_SUCCESS,
        token: socialData.token,
        userId: socialData.userId,
        fName: socialData.fName,
        lName: socialData.lName
    }
};

export const logout = () => {
    localStorage.removeItem('social-data');
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

                const socialData = {
                    token: response.data.token,
                    expirationDate: expirationTime,
                    userId: response.data.userId,
                    fName: response.data.fName,
                    lName: response.data.lName
                };
                localStorage.setItem('social-data', JSON.stringify(socialData));
                
                dispatch(logInSuccess(socialData));
                dispatch(authCheckTimeout(response.data.expiresIn));
        })
        .catch(error => {
            dispatch(authFail(error.response.data.message));
        });
    }
}

export const resetUserData = (socialData) => {
    return {
        type: actionTypes.RESET_USERDATA,
        token: socialData.token,
        userId: socialData.userId,
        fName: socialData.fName,
        lName: socialData.lName
    }
}

export const authCheckState = () => {
    return dispatch => {
        const socialData = JSON.parse(localStorage.getItem('social-data')) || {};
        const token = socialData.token;
        if (!token) {
            dispatch(logout());
        } else {
            const experationDate = new Date(socialData.expirationDate);
            if (experationDate <= new Date()) {
                dispatch(logout());
            } else {
                dispatch(resetUserData(socialData));
                dispatch(authCheckTimeout((experationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    };
};

