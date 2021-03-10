import get from 'lodash/get'

import useAuth from './useAuth'

const useJWTToken = () => {
    const {
        user,
    } = useAuth()

    return get(user, 'token')
}

export default useJWTToken
