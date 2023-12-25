import axios from '../../customize/axios'
import { LOGIN, GET_ACCOUNT, LOGOUT } from '../constants'

// dispatch: Dùng để gửi một hành động (action) đến store để thay đổi trạng thái của ứng dụng.

const handleActionLogin = (ssoToken) => {
    return async(dispatch, getState) => {

        dispatch({
            type: LOGIN.LOGIN_REQUEST
        })

        axios.post(
            process.env.REACT_APP_BACKEND_SSO_VERIFY_SSO_TOKEN, 
            { ssoToken: ssoToken }
        )
        .then(function (data) {
            if(data && Number(data.EC) === 0) {
                dispatch({
                    type: LOGIN.LOGIN_SUCCESS,
                    user: data.DT // Dữ liệu chúng ta truyền kèm theo 
                })
            }
            else {
                dispatch({
                    type: LOGIN.LOGIN_FAIL,
                    error: { // Dữ liệu chúng ta truyền kèm theo 
                        errorCode: data.EC,
                        errorMsg: data.EM,
                    }
                })
            }
        })
        .catch(function (error) {
            dispatch({
                type: LOGIN.LOGIN_FAIL,
                error: error
            })
        })

    };
}

const handleActionGetAccount = () => {
    return async(dispatch, getState) => {

        dispatch({
            type: GET_ACCOUNT.GET_ACCOUNT_REQUEST
        })

        axios.get(
            process.env.REACT_APP_BACKEND_SSO_GET_ACCOUNT
        )
        .then(function (data) {
            if(data && Number(data.EC) === 0) {
                dispatch({
                    type: GET_ACCOUNT.GET_ACCOUNT_SUCCESS,
                    user: data.DT // Dữ liệu chúng ta truyền kèm theo 
                })
            }
            else {
                dispatch({
                    type: GET_ACCOUNT.GET_ACCOUNT_FAIL,
                    error: { // Dữ liệu chúng ta truyền kèm theo 
                        errorCode: data.EC,
                        errorMsg: data.EM,
                    }
                })
            }
        })
        .catch(function (error) {
            dispatch({
                type: GET_ACCOUNT.GET_ACCOUNT_FAIL,
                error: error
            })
        })

    };
}

const handleActionLogout = (ssoToken) => {
    return async(dispatch, getState) => {

        dispatch({
            type: LOGOUT.LOGOUT_REQUEST
        })

        axios.post(
            process.env.REACT_APP_BACKEND_SSO_LOGOUT, 
            {}
        )
        .then(function (data) {
            if(data && Number(data.EC) === 0) {
                dispatch({
                    type: LOGOUT.LOGOUT_SUCCESS,
                })
            }
            else {
                dispatch({
                    type: LOGOUT.LOGOUT_FAIL,
                    error: { // Dữ liệu chúng ta truyền kèm theo 
                        errorCode: data.EC,
                        errorMsg: data.EM,
                    }
                })
            }
        })
        .catch(function (error) {
            dispatch({
                type: LOGOUT.LOGOUT_FAIL,
                error: error
            })
        })

    };
}

export {
    handleActionLogin,
    handleActionGetAccount,
    handleActionLogout
}