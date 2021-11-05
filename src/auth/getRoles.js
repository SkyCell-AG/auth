import keycloakService from 'utils/keycloakService'

const getRoles = ({
    user,
}) => {
    return keycloakService({
        method: 'GET',
        url: `user/roles`,
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
