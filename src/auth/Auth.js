import React, {
    useMemo,
} from 'react'
import PropTypes from 'prop-types'

import {
    PRISTIN,
    PENDING,
    FAILURE,
} from 'utils/requestStatuses'

import userData from './user'
import useAuthentication from './hooks/useAuthentication'
import AuthContext from './AuthContext'

const propTypes = {
    children: PropTypes.element.isRequired,
}

const Auth = ({
    children,
}) => {
    const {
        user,
        status,
        microsoftData,
    } = useAuthentication()

    const contextValue = useMemo(() => {
        return {
            user,
            status,
            microsoftData,
        }
    }, [
        microsoftData,
        status,
        user,
    ])

    userData.data = user

    if (status === PRISTIN || status === PENDING) {
        return <div>Loading...</div>
    }

    if (status === FAILURE) {
        return (
            <div>
                An Error happened during login
            </div>
        )
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

Auth.propTypes = propTypes

export default Auth
