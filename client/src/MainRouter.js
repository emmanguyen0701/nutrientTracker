import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Home from './components/Home'
import Diary from './diary/Diary'
import GoogleSignin from './auth/GoogleSignin'
import Menu from './components/Menu'
import ProtectedRoute from './auth/ProtectedRoute'
import Reports from './report/Reports'

const MainRouter = () => {
    return (
        <div>
            <Menu />
            <Routes>
                <Route path='/' element={<Home />} />
                
                <Route path='signin' element={<GoogleSignin />} />
                <Route path='diary'>
                    <Route path=':userId' element={
                        <ProtectedRoute>
                            <Diary />
                        </ProtectedRoute> 
                    } />
                </Route>
                <Route path='reports' element={
                    <ProtectedRoute>
                        <Reports />
                    </ProtectedRoute>
                } />
            </Routes>
        </div>
    )
}

export default MainRouter