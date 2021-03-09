import React from 'react'
import {
    Provider,
} from 'react-redux'

import thunk from 'redux-thunk'

import {
    combineReducers,
    createStore,
    applyMiddleware,
} from 'redux'

import Auth from 'auth/Auth'
import './App.css'

import reducer from 'auth/store/reducers'

const store = createStore(
    combineReducers({
        auth: reducer,
    }),
    applyMiddleware(thunk),
)

function App() {
    return (
        <Provider store={store}>
            <Auth><div>test</div></Auth>
        </Provider>
    )
}

export default App
