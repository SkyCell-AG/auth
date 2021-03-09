import keycloak from 'keycloak'
import generateAsyncActions from 'utils/generateAsyncActions'

import {
    getMicrosoftToken,
} from './getMicrosftToken'
import {
    updateToken,
} from './updateToken'

import getRoles from './getRoles'

export const INIT_SESSION = generateAsyncActions('INIT_SESSION')
export const SAVE_MICROSOFT_ACCESS_TOKEN = 'SAVE_MICROSOFT_ACCESS_TOKEN'

let inited = false

let sessionTimeOutId

export const init = () => {
    return (dispatch) => {
        if (inited) {
            return
        }

        inited = true

        dispatch({
            type: INIT_SESSION.pending,
        })

        keycloak
            .init({
                promiseType: 'native',
                onLoad: 'login-required',
            })
            .then(() => {
                return keycloak.loadUserProfile()
            })
            .then((user) => {
                if (sessionTimeOutId) {
                    clearTimeout(sessionTimeOutId)
                }

                sessionTimeOutId = setTimeout(
                    () => {
                        dispatch(updateToken())
                    },
                    keycloak.idTokenParsed.exp * 1000 - (new Date()).getTime() - 4000,
                )

                return getRoles({
                    userId: keycloak.idTokenParsed.sub,
                    token: keycloak.token,
                    user,
                })
            })
            .then((resp) => {
                dispatch({
                    type: INIT_SESSION.success,
                    payload: {
                        user: {
                            ...resp.user,
                            role: resp.roles,
                            token: keycloak.token,
                        },
                    },
                })
                dispatch(getMicrosoftToken())
            })
            .catch((err) => {
                dispatch({
                    type: INIT_SESSION.failure,
                    err,
                })
            })
    }
}
