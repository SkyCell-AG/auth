import {
    useMemo,
} from 'react'
import useUserRoles from './useUserRoles'

const useAllowed = (allowedRoles) => {
    const roles = useUserRoles()

    const allowed = useMemo(() => {
        return roles.some((r) => { return allowedRoles.some((a) => { return a === r }) })
    }, [
        roles,
        allowedRoles,
    ])

    return allowed
}

export default useAllowed
