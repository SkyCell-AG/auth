import keycloak from 'keycloak'

const logout = () => {
    return keycloak.logout()
}

export default logout
