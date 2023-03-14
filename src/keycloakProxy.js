import axios from 'axios'
import Keycloak from 'keycloak-js'

const {
    REACT_APP_AUTH_SERVER_URL: url,
    REACT_APP_REALM: realm,
    REACT_APP_RESOURCE: clientId,
} = process.env

let keyCloakadapter

const keycloakProxy = new Proxy({
    init: (...rest) => {
        keyCloakadapter = new Keycloak({
            url,
            realm,
            clientId,
        })
        return keyCloakadapter.init(...rest)
    },
    getActiveDirectory: () => {
        return axios.get(`${keyCloakadapter.authServerUrl}/realms/${keyCloakadapter.realm}/broker/microsoft/token`, {
            headers: {
                Authorization: `Bearer ${keyCloakadapter.token}`,
            },
        })
            .then((resp) => {
                return resp.data
            })
    },
}, {
    get(target, prop) {
        if (target[prop]) {
            return target[prop]
        }

        if (!keyCloakadapter) {
            return undefined
        }

        return keyCloakadapter[prop]
    },
})

export default keycloakProxy
