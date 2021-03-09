import keycloak from 'keycloak'

export const GET_MICROSOFT_TOKEN = 'GET_MICROSOFT_TOKEN'

export const getMicrosoftToken = () => {
    return (dispatch) => {
        keycloak.getActiveDirectory()
            .then((microsoftData) => {
                dispatch({
                    type: GET_MICROSOFT_TOKEN,
                    payload: {
                        microsoftData,
                    },
                })
            })
    }
}
