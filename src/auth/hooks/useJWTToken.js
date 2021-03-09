import {
    useSelector,
} from 'react-redux'
import get from 'lodash/get'

const useJWTToken = () => {
    const user = useSelector(({
        auth,
    }) => {
        return auth.user
    })

    return get(user, 'token')
}

export default useJWTToken
