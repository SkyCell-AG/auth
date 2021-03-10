import React, {
    useMemo,
} from 'react'
import PropTypes from 'prop-types'
import {
    LoadingScreen,
} from '@skycell-ag/shared-components'

import {
    PRISTIN,
    PENDING,
    FAILURE,
} from 'utils/requestStatuses'
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

    if (status === PRISTIN || status === PENDING) {
        return <LoadingScreen />
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
