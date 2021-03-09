import keycloakService from 'utils/keycloakService'

const getRoles = ({
    userId,
    token,
    user,
}) => {
    return keycloakService({
        method: 'GET',
        url: `user/${userId}/roles`,
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
