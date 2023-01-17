import flow from 'lodash/flow'
import Axios from 'axios'

import bearerToken from './bearerToken'
import addHostUrl from './addHostUrl'
import defaultRequest from './defaultRequest'

const {
    REACT_APP_SKYMIND_API: apiUrl,
} = process.env

const keycloakService = (params) => {
    const modifiedQuery = flow([
        defaultRequest,
        bearerToken,
        addHostUrl(`${apiUrl}/keycloak-new/v1`),
    ])(Axios)

    return modifiedQuery(params)
}

export default keycloakService
