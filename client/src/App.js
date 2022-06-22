import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import { ThemeProvider } from '@mui/material'

import { CssBaseline } from "@mui/material"

import theme from './theme'
import MainRouter from './MainRouter'

const App = () => {
    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <MainRouter />
            </ThemeProvider>
           
        </BrowserRouter>
    )
}

export default hot(module)(App)