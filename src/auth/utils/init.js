import keycloak from 'keycloak'
import {
    PENDING,
    SUCCESS,
    FAILURE,
} from 'utils/requestStatuses'

import getRoles from './getRoles'
import getMicrosoftToken from './getMicrosftToken'

const SESSION_TIME = 1000 * 60 * 3

let sessionTimeOutId

const init = ({
    setStatus,
    setUser,
    setMicrosoftData,
}) => {
    setStatus(PENDING)

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
                    setStatus(PENDING)

                    keycloak.updateToken(SESSION_TIME)
                        .then(() => {
                            setStatus(SUCCESS)
                        })
                        .catch(() => {
                            setStatus(FAILURE)
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
            setStatus(SUCCESS)
            setUser({
                ...resp.user,
                role: resp.roles,
                token: keycloak.token,
            })
            getMicrosoftToken(setMicrosoftData)
        })
        .catch(() => {
            setStatus(FAILURE)
        })
}

export default init
