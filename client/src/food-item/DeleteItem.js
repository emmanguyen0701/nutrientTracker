import React from 'react'

import { Dialog, DialogTitle, 
    Box, Button
} from '@mui/material'

import auth from '../auth/auth-helper'
import { deleteItemFromDiary } from '../diary/api-diary'


const DeleteItem = ({ open, onClose, item, onDeleteItem }) => {
    const authObj = auth.isAuthenticated()
    const handleClose = () => onClose()

    const handleDeleteItem = () => {
        // make call to backend to delete selected items
        deleteItemFromDiary({ userId: authObj.user._id }, 
            { itemId: item._id }, 
            { token: authObj.token })
        .then(res => {
            if (res && res.error) { console.log(err) }
            else {
                onDeleteItem(item)
                onClose()
            }
        })
    }
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle sx={{ p: '30px 45px 30px 45px' }}>Delete {item.name} from diary?</DialogTitle>
            <Box sx={{ display: 'flex', height: '80px',justifyContent: 'center' }}>
                <Button sx={{ height: '50%', width: '80px', mr: '8px', bgcolor: 'error.main', color: 'white', '&:hover': { bgcolor: 'error.hover' } }} 
                onClick={handleDeleteItem}>Delete</Button>
                <Button sx={{ height: '50%',width: '80px', border: 1 }} 
                onClick={handleClose} >Cancel</Button>
            </Box>
        </Dialog>
    )
}

export default DeleteItem