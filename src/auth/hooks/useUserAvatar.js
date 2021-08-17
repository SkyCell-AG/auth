import {
    useQuery,
} from 'react-query'
import get from 'lodash/get'

import getAvatar from 'services/getAvatar'
import useAuth from 'auth/hooks/useAuth'

const useUserAvatar = () => {
    const {
        microsoftData,
    } = useAuth()

    const queryResp = useQuery([
        'getAvatar',
        {
            token: microsoftData?.access_token,
        },
    ], (context) => {
        return getAvatar(get(context, 'queryKey[1].token'))
    })

    return queryResp
}

export default useUserAvatar
