import {
    useEffect,
    useReducer,
} from 'react'
import keycloak from 'keycloak'

import createReducer from 'utils/createReducer'
import getMicrosoftToken, {
    GET_MICROSOFT_TOKEN,
} from 'auth/getMicrosftToken'
import {
    FAILURE,
    PENDING,
    PRISTIN,
    SUCCESS,
} from 'utils/requestStatuses'
import generateAsyncActions from 'utils/generateAsyncActions'
import getRoles from 'auth/getRoles'

const INIT_SESSION = generateAsyncActions('INIT_SESSION')
const UPDATE_SESSION = generateAsyncActions('UPDATE_SESSION')
const SESSION_TIME = 1000 * 60 * 3

let sessionTimeOutId

const initState = {
    status: PRISTIN,
    user: null,
}

const reducer = createReducer(
    {
        [GET_MICROSOFT_TOKEN]: (state, {
            payload: {
                microsoftData,
            },
        }) => {
            return {
                ...state,
                microsoftData,
            }
        },
        [INIT_SESSION.pending]: (state) => {
            return {
                ...state,
                status: PENDING,
            }
        },
        [INIT_SESSION.failure]: (state) => {
            return {
                ...state,
                status: FAILURE,
            }
        },
        [INIT_SESSION.success]: (state, {
            payload: {
                user,
            },
        }) => {
            return {
                ...state,
                user,
                status: SUCCESS,
            }
        },
        [UPDATE_SESSION.failure]: (state) => {
            return {
                ...state,
                status: FAILURE,
            }
        },
        [UPDATE_SESSION.success]: (state) => {
            return {
                ...state,
                status: SUCCESS,
            }
        },
        [UPDATE_SESSION.pending]: (state) => {
            return {
                ...state,
                status: PENDING,
            }
        },
    },
    initState,
)

const useAuthentication = () => {
    const [
        {
            user,
            status,
            microsoftData,
        },
        dispatch,
    ] = useReducer(
        reducer,
        initState,
    )

    useEffect(() => {
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
            .then((userData) => {
                if (sessionTimeOutId) {
                    clearTimeout(sessionTimeOutId)
                }

                sessionTimeOutId = setTimeout(
                    () => {
                        dispatch({
                            type: UPDATE_SESSION.pending,
                        })

                        keycloak.updateToken(SESSION_TIME)
                            .then(() => {
                                dispatch({
                                    type: UPDATE_SESSION.success,
                                })
                            })
                            .catch((err) => {
                                dispatch({
                                    type: UPDATE_SESSION.failure,
                                    err,
                                })
                            })
                    },
                    keycloak.idTokenParsed.exp * 1000 - (new Date()).getTime() - 4000,
                )

                return getRoles({
                    user: userData,
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
    }, [])

    return {
        user,
        status,
        microsoftData,
    }
}

export default useAuthentication
