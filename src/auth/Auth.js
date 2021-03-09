import React, {
    useEffect,
} from 'react'
import PropTypes from 'prop-types'
import {
    useDispatch, useSelector,
} from 'react-redux'
import {
    LoadingScreen,
} from '@skycell-ag/shared-components'

import {
    PRISTIN,
    PENDING,
    FAILURE,
} from 'utils/requestStatuses'
import {
    init,
} from 'auth/store/actions/init'

const propTypes = {
    children: PropTypes.element.isRequired,
}

const Auth = ({
    children,
}) => {
    const dispatch = useDispatch()
    const status = useSelector((state) => {
        return state.auth.status
    })

    useEffect(() => {
        dispatch(init())
    }, [dispatch])

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
        <>
            {children}
        </>
    )
}

Auth.propTypes = propTypes

export default Auth
