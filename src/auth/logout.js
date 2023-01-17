import keycloak from 'keycloakProxy'

const logout = () => {
    return keycloak.logout()
}

export default logout
