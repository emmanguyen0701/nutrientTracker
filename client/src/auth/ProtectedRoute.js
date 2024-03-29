import React from 'react'
import { Navigate } from 'react-router-dom'

import auth from './auth-helper'

const ProtectedRoute = ({ children }) => {
    return auth.isAuthenticated() ? children : <Navigate to='/signin' />
}


export default ProtectedRoute