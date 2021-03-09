import keycloak from 'keycloak'
import generateAsyncActions from 'utils/generateAsyncActions'

// TODO: check lifetime of the session
const SESSION_TIME = 1000 * 60 * 3

export const UPDATE_SESSION = generateAsyncActions('UPDATE_SESSION')

export const updateToken = () => {
    return (dispatch) => {
        dispatch({
            type: UPDATE_SESSION.pending,
        })

        keycloak.updateToken(SESSION_TIME)
            .then(() => {
                dispatch({
                    type: UPDATE_SESSION.success,
                })
            })
            .catch(() => {
                dispatch({
                    type: UPDATE_SESSION.failure,
                })
            })
    }
}
