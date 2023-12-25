import { LOGIN, GET_ACCOUNT, LOGOUT } from '../constants'

const INITIAL_STATE = {
    userInfo: {
        access_token: "",
        refresh_token: "",
        email: "",
        username: "",
        groupWithRoles: {}
    },
    isLoading: false,
    errorMsg: ""
};

const accountReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN.LOGIN_REQUEST:
        case GET_ACCOUNT.GET_ACCOUNT_REQUEST:
            return {
                ...state,
                isLoading: true,
                errorMsg: ""
            }
        case LOGIN.LOGIN_SUCCESS:
        case GET_ACCOUNT.GET_ACCOUNT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                errorMsg: "",
                userInfo: action.user
            }
        case LOGIN.LOGIN_FAIL:
        case GET_ACCOUNT.GET_ACCOUNT_FAIL:
            return {
                ...state,
                isLoading: false,
                errorMsg: action.error.errorMsg
            }
        case LOGOUT.LOGOUT_REQUEST:
            return {
                ...state,
                isLoading: false,
                errorMsg: ""
            }
        case LOGOUT.LOGOUT_SUCCESS:
            return {
                ...state,
                userInfo: {
                    access_token: "",
                    refresh_token: "",
                    email: "",
                    username: "",
                    groupWithRoles: {}
                },
                isLoading: false,
                errorMsg: ""
            }
        case LOGOUT.LOGOUT_FAIL:
            return {
                ...state,
                isLoading: false,
                errorMsg: ""
            }
        default: 
            return state;
    }
};

export default accountReducer;
