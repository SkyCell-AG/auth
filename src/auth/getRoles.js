import keycloakService from 'utils/keycloakService'

const getRoles = ({
    token,
    user,
}) => {
    return keycloakService({
        method: 'GET',
        url: 'user/roles',
        token,
    }).then((data) => {
        return {
            user,
            roles: data.map(({
                name,
            }) => {
                return name
            }),
        }
    })
}

export default getRoles
