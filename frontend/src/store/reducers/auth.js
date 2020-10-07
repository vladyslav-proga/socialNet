import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    userId: null,
    successLogedUp: false,
    loading: false,
    error: null,
    mod: 'sign-up',
    successLogIn: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                error: null,
                loading: true,
                successLogedUp: false
            };
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error,
                successLogedUp: false,
            }
        case actionTypes.LOG_UP_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                successLogedUp: true,
                mod: 'sign-in'
            }
        case actionTypes.LOG_IN_SUCCESS:
            return {
                ...state,
                token: action.token,
                userId: action.userId,
                error: null,
                loading: false,
                successLogIn: true,
            }
        case actionTypes.SWITCH_MOD_TO_SIGN_IN:
            return {
                ...state,
                mod: 'sign-in'
            }
        case actionTypes.SWITCH_MOD_TO_SIGN_UP:
            return {
                ...state,
                mod: 'sign-up',
                successLogedUp: false
            }
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                userId: null,
                successLogedUp: false,
                successLogIn: false
            }
        default:
            return state;
    }
};

export default reducer;