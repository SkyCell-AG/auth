import {
    useMemo,
} from 'react'
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

    const microsoftToken = useMemo(() => {
        return microsoftData?.access_token
    }, [microsoftData])

    const queryResp = useQuery([
        'getAvatar',
        {
            microsoftToken,
        },
    ], (context) => {
        return getAvatar(get(context, 'queryKey[1].microsoftToken'))
    }, {
        enabled: Boolean(microsoftToken),
    })

    return queryResp
}

export default useUserAvatar
