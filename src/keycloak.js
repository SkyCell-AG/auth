import axios from 'axios'
import loadScript from 'utils/loadScript'

const {
    REACT_APP_AUTH_SERVER_URL: url,
    REACT_APP_REALM: realm,
    REACT_APP_RESOURCE: clientId,
} = process.env

let keyCloakadapter

const keycloak = new Proxy({
    init: (...rest) => {
        return loadScript(`${url}/js/keycloak.js`)
            .then(() => {
                keyCloakadapter = new window.Keycloak({
                    url,
                    realm,
                    clientId,
                })
            })
            .then(() => {
                return keyCloakadapter.init(...rest)
            })
    },
    getActiveDirectory: () => {
        return axios.get(`${keyCloakadapter.authServerUrl}/realms/skycell/broker/microsoft/token`, {
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

export default keycloak
