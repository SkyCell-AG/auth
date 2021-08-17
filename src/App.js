import React from 'react'

import useUserAvatar from 'auth/hooks/useUserAvatar'
import './App.css'

function App() {
    const {
        data: avatar,
    } = useUserAvatar()

    console.log(avatar)

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
