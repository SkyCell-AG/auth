import React from 'react'
import ReactDOM from 'react-dom' // eslint-disable-line import/no-extraneous-dependencies
import './index.css'
import {
    QueryClientProvider,
    QueryClient,
} from 'react-query'
import Auth from 'auth/Auth'

import App from './App'

const queryClient = new QueryClient()

ReactDOM.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <Auth>
                <App />
            </Auth>
        </QueryClientProvider>
    </React.StrictMode>,
    document.getElementById('root'),
)
