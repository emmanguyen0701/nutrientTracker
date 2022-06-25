import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Box } from '@mui/material'

import useWindowDimension from '../hook/useWindowDimension'
import auth from '../auth/auth-helper'
import logo from '../assets/images/imageedit_7_7726880872.png'

const Menu = () => {
    const navigate = useNavigate()
    const authObj = auth.isAuthenticated()
    const isMobile = useWindowDimension() <= 860

    return (
        <Box sx={{ bgcolor: 'primary.main', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 5.5vw 0.8rem 3.5vw' }}>
            <Box>
                <Link to='/'>
                        <img style={{ color: 'white', width: '70px', height: '70px' }} 
                        src={logo} />
                </Link>
            </Box>
            <Box sx={{  display: 'flex',fontWeight: '600', fontSize: '18px', justifyContent: 'space-between', width: isMobile ? '220px' :'280px' }}>
                {!!authObj
                ? (<Box sx={{  display: 'flex', fontWeight: '600', fontSize: '18px', justifyContent: 'space-between', width: '250px' }}>
                    <Link style={{ color: 'white' }} to={`/diary/${authObj.user._id}`}>Diary</Link>
                    <Link style={{ color: 'white' }} to='/reports'>Reports</Link>
                    <Box sx={{ color: 'white', '&:hover': { cursor: 'pointer' } }} onClick={() => auth.clearJWT(() => navigate('/'))}>Logout</Box>
                </Box>)
                : <Link style={{ color: 'white', marginLeft: '140px' }} to='/signin'>Loggin</Link>}
                
            </Box>  
        </Box>
    )
}

export default Menu