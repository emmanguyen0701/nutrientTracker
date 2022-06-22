import { createTheme } from '@mui/material/styles'

const theme = createTheme({
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    margin: 0,
                    padding: 0,
                    boxSizing: 'border-box',
                },
                a: {
                    textDecoration: 'none'
                },
            }
        }
    },
    palette: {
        primary: {
            main: '#92a746',
            contrastText: 'white',
            hover: '#7c8f36',
        },
        secondary: {
            main: '#fa953c',
            contrastText: 'white',
            hover: '#d67f31'
        },
        error: {
            main: '#c62828',
            contrastText: 'white',
            hover: '#ad2323'
        },
    }
})

export default theme