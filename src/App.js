import React from 'react'

import useUserAvatar from 'auth/hooks/useUserAvatar'
import './App.css'

function App() {
    const {
        data: avatar,
    } = useUserAvatar()

    return (
        <div>
            <img
                src={avatar}
                alt="user avatar"
            />
            test
        </div>
    )
}

export default App
