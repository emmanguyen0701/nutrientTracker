import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Dialog, DialogTitle,
    Button, Box,
} from '@mui/material'

const SignInDialog = ({ open,onClose }) => {
    const navigate = useNavigate()
    
    const handleClose = () => onClose()

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle sx={{ p: '30px 60px 30px 60px' }}>Loggin is required.</DialogTitle>
            <Box sx={{ display: 'flex', height: '80px',justifyContent: 'center' }}>
                <Button sx={{ height: '50%', width: '120px', mr: '8px', bgcolor: 'primary.main', color: 'white', '&:hover': { bgcolor: 'primary.hover' } }} 
                onClick={() => navigate('/signin')}>Go To Loggin</Button>
                <Button sx={{ height: '50%', width: '80px', border: 1 }} 
                onClick={() => handleClose()}>Cancel</Button>
            </Box>
            
        </Dialog>
    )
}

export default SignInDialog