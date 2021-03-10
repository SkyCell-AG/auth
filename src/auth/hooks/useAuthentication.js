import {
    useEffect,
    useReducer,
} from 'react'

import createReducer from 'utils/createReducer'
import {
    GET_MICROSOFT_TOKEN,
} from 'auth/getMicrosftToken'
import {
    FAILURE,
    PENDING,
    PRISTIN,
    SUCCESS,
} from 'utils/requestStatuses'
import generateAsyncActions from 'utils/generateAsyncActions'
import init from 'auth/init'

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
        init(dispatch)
    }, [])

    return {
        user,
        status,
        microsoftData,
    }
}

export default useAuthentication
