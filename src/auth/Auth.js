import React, {
    useEffect,
    useMemo,
    useReducer,
} from 'react'
import PropTypes from 'prop-types'
import {
    LoadingScreen,
} from '@skycell-ag/shared-components'

import {
    PRISTIN,
    PENDING,
    FAILURE,
    SUCCESS,
} from 'utils/requestStatuses'
import createReducer from 'utils/createReducer'
import generateAsyncActions from 'utils/generateAsyncActions'

import AuthContext from './AuthContext'
import init from './init'
import {
    GET_MICROSOFT_TOKEN,
} from './utils/getMicrosftToken'

const propTypes = {
    children: PropTypes.element.isRequired,
}

const INIT_SESSION = generateAsyncActions('INIT_SESSION')

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
    },
    initState,
)

const Auth = ({
    children,
}) => {
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
        init(dispatch)
    }, [])

    const contextValue = useMemo(() => {
        return {
            user,
            status,
            microsoftData,
        }
    }, [
        microsoftData,
        status,
        user,
    ])

    if (status === PRISTIN || status === PENDING) {
        return <LoadingScreen />
    }

    if (status === FAILURE) {
        return (
            <div>
                An Error happened during login
            </div>
        )
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

Auth.propTypes = propTypes

export default Auth
