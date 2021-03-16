import {
    useMemo,
    useEffect,
} from 'react'
import {
    useRemoteData,
} from '@skycell-ag/shared-components'

import getAvatar from 'services/getAvatar'
import useAuth from 'auth/hooks/useAuth'

const useUserAvatar = () => {
    const [
        state,
        load,
    ] = useRemoteData(getAvatar)

    const {
        microsoftData,
    } = useAuth()

    const token = useMemo(() => {
        return microsoftData?.access_token
    }, [microsoftData])

    useEffect(() => {
        if (token) {
            load(token)
        }
    }, [
        load,
        token,
    ])

    return {
        state,
    }
}

export default useUserAvatar
