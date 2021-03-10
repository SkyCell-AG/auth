import keycloak from 'keycloak'

const getMicrosoftToken = (setMicrosoftData) => {
    return keycloak.getActiveDirectory()
        .then((microsoftData) => {
            setMicrosoftData(microsoftData)
        })
}

export default getMicrosoftToken
