import keycloak from 'keycloak'
import generateAsyncActions from 'utils/generateAsyncActions'

import getRoles from 'auth/utils/getRoles'
import getMicrosoftToken from 'auth/utils/getMicrosftToken'

const INIT_SESSION = generateAsyncActions('INIT_SESSION')

const SESSION_TIME = 1000 * 60 * 3

let sessionTimeOutId

const init = (dispatch) => {
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
                    dispatch({
                        type: INIT_SESSION.pending,
                    })

                    keycloak.updateToken(SESSION_TIME)
                        .then(() => {
                            dispatch({
                                type: INIT_SESSION.success,
                            })
                        })
                        .catch((err) => {
                            dispatch({
                                type: INIT_SESSION.failure,
                                err,
                            })
                        })
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
            getMicrosoftToken(dispatch)
        })
        .catch((err) => {
            dispatch({
                type: INIT_SESSION.failure,
                err,
            })
        })
}

export default init
