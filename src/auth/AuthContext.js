import {
    createContext,
} from 'react'

const AuthContext = createContext({
    status: undefined,
    user: null,
})

export default AuthContext
