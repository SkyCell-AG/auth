import React, {
    useEffect,
    useState,
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

import AuthContext from './AuthContext'
import init from './utils/init'

const propTypes = {
    children: PropTypes.element.isRequired,
}

const Auth = ({
    children,
}) => {
    const [
        status,
        setStatus,
    ] = useState(PRISTIN)

    const [
        microsoftData,
        setMicrosoftData,
    ] = useState()

    const [
        user,
        setUser,
    ] = useState()

    useEffect(() => {
        init({
            setStatus,
            setMicrosoftData,
            setUser,
        })
    }, [])

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
