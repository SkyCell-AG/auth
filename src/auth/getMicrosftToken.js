import keycloak from 'keycloakProxy'

export const GET_MICROSOFT_TOKEN = 'GET_MICROSOFT_TOKEN'

const getMicrosoftToken = (dispatch) => {
    return keycloak.getActiveDirectory()
        .then((microsoftData) => {
            dispatch({
                type: GET_MICROSOFT_TOKEN,
                payload: {
                    microsoftData,
                },
            })
        })
}

export default getMicrosoftToken
