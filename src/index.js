import React from 'react'
import {
    createRoot,
} from 'react-dom/client' // eslint-disable-line import/no-extraneous-dependencies
import './index.css'
import {
    QueryClientProvider,
    QueryClient,
} from 'react-query'
import Auth from 'auth/Auth'

import App from './App'

const container = document.getElementById('root')
const root = createRoot(container)

const queryClient = new QueryClient()

root.render(
    <QueryClientProvider client={queryClient}>
        <Auth>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </Auth>
    </QueryClientProvider>,
)
