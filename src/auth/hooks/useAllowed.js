import {
    useMemo,
} from 'react'
import useUserRoles from './useUserRoles'

const useAllowed = (...requiredRoles) => {
    const roles = useUserRoles()

    const allowed = useMemo(() => {
        return roles.some((r) => { return requiredRoles.some((a) => { return a === r }) })
    }, [
        roles,
        requiredRoles,
    ])

    return allowed
}

export default useAllowed
