import {
    useMemo,
    useEffect,
    useCallback,
} from 'react'
import {
    useQuery,
} from 'react-query'

import getAvatar from 'services/getAvatar'
import useAuth from 'auth/hooks/useAuth'

const useUserAvatar = () => {
    const {
        microsoftData,
    } = useAuth()

    const token = useMemo(() => {
        return microsoftData?.access_token
    }, [microsoftData])

    const getUserAvatar = useCallback((newToken) => {
        console.log('new token')
        return getAvatar(newToken)
    }, [])

    const queryResp = useQuery('getAvatar', getUserAvatar)

    const {
        refetch,
    } = queryResp

    useEffect(() => {
        refetch(token)
    }, [
        refetch,
        token,
    ])

    return queryResp
}

export default useUserAvatar
