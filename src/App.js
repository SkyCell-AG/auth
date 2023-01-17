import React, {
    useCallback,
} from 'react'

import useUserAvatar from 'auth/hooks/useUserAvatar'
import useUserRoles from 'auth/hooks/useUserRoles'
import useJWTToken from 'auth/hooks/useJWTToken'
import useAuth from 'auth/hooks/useAuth'
import logout from 'auth/logout'
import './App.css'

function App() {
    const {
        data: avatar,
    } = useUserAvatar()
    const roles = useUserRoles()
    const token = useJWTToken()
    const allData = useAuth()

    const logoutHandler = useCallback(() => {
        logout()
    }, [])

    return (
        <div>
            <div>
                <img
                    src={avatar}
                    alt="user avatar"
                />
                <br />
                <span>
                    with roles :
                    {JSON.stringify(roles)}
                </span>
                <br />
                <span>
                    With token :
                    {token}
                </span>
                <br />
                <span>
                    All data :
                    {JSON.stringify(allData)}
                </span>
            </div>
            <button
                type="button"
                onClick={logoutHandler}
            >
                LOGOUT
            </button>
        </div>
    )
}

export default App
