import {
    useMemo,
} from 'react'
import useAuth from './useAuth'

const useUserRoles = () => {
    const {
        user,
    } = useAuth()

    const roles = useMemo(() => {
        return (user && user.role) || []
    }, [user])

    return roles
}

export default useUserRoles
