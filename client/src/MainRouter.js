import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Home from './components/Home'
import Diary from './diary/Diary'
import GoogleSignin from './auth/GoogleSignin'
import Menu from './components/Menu'
import ProtectedRoute from './auth/ProtectedRoute'
import Reports from './report/Reports'
import Footer from './components/footer/Footer'
import MobileFooter from './components/footer/MobileFooter'
import useWindowDimension from './hook/useWindowDimension'

const MainRouter = () => {
    const isMobile = useWindowDimension() <= 860

    return (
        <div style={{ margin: 0, height: '100vh', display: 'flex', flexDirection: 'column' }}>
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
            { isMobile ? <MobileFooter /> : <Footer /> } 
        </div>
    )
}

export default MainRouter