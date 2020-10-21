import * as actionTypes from '../actions/actionTypes';

const initialState = {
    //userInfo
    token: null,
    userId: null,
    fName: null,
    lName: null,

    //mod status
    mod: 'sign-in',

    //client status
    loading: false,
    error: null,
    successLogedUp: false,
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
                fName: action.fName,
                lName: action.lName,
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
                fName: null,
                lname: null,
                successLogedUp: false,
                successLogIn: false
            }
        case actionTypes.RESET_USERDATA:
            return {
                ...state,
                token: action.token,
                userId: action.userId,
                fName: action.fName,
                lName: action.lName
            }
        default:
            return state;
    }
};

export default reducer;