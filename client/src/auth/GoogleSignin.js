import React from 'react'
import { Navigate } from 'react-router-dom'

import { Box, Typography,
} from '@mui/material'

import { signIn } from './api-auth'
import auth from './auth-helper'

const GOOGLE_CLIENT_ID = '891523892023-uacgbpg0u1rhf99e8jilfvtk4onr42ic.apps.googleusercontent.com'

class GoogleSignin extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: '',
            redirect: false,
        }

        window.handleCredentialResponse = this.handleCredentialResponse.bind(this)
    }

    componentDidMount() {
        setTimeout(() => {
            google.accounts.id.initialize({
                client_id: GOOGLE_CLIENT_ID,
                callback: handleCredentialResponse,
            })
            google.accounts.id.renderButton(
                document.getElementById('buttonDiv'),
                { theme: 'outline', size: 'large' }
            )
            google.accounts.id.prompt()
        }, 1000)
    }

    handleCredentialResponse (credentialResponse) {
         // token obj from Google, used to manage users authentication.
        signIn(credentialResponse).then(res => {
            if (res && res.error) this.setState({ ...this.state, error: res.error })
            else {
                auth.authenticate({ token: res.token, user: res.user }, () => {
                    this.setState({ ...this.state, redirect: true })
                })
            }
        })
    }
    
    render() {
        if (this.state.redirect) {
            return (<Navigate to='/' /> )
        }
         return (
         <Box sx={{ m: '10px 0 0 20px' }}>      
            <Typography sx={{ mb: '14px' }} variant='h6'>Sign in with Google</Typography>
            <div id='buttonDiv'></div>
            { this.state.error && <Typography>Error occurred when sign in. Please try again.</Typography> }
        </Box>)
    }
}

export default GoogleSignin