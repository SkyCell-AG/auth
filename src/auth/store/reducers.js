import createReducer from 'utils/createReducer'
import {
    PRISTIN,
    PENDING,
    SUCCESS,
    FAILURE,
} from 'utils/requestStatuses'

import {
    INIT_SESSION,
} from './actions/init'
import {
    GET_MICROSOFT_TOKEN,
} from './actions/getMicrosftToken'

const initState = {
    status: PRISTIN,
    user: null,
}

export default createReducer(
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
