import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Divider, Button,
    Box, Typography,
    DialogTitle, Dialog, 
} from '@mui/material'

import capitalizeFirstLetter from '../utils/capitalizeString'
import getBadNutrients from '../utils/getBadNutrients'
import { addFoodToDiary } from '../diary/api-diary'
import SignInDialog from '../auth/SignInDialog'
import auth from '../auth/auth-helper'

const AddDiaryComplete = ({ open, onClose }) => {
    const navigate = useNavigate()
    const authObj = auth.isAuthenticated()

    const handleClose = () => onClose()

    const handleRedirect = () => {
        onClose()
        navigate(`/diary/${authObj.user._id}`)
    }

    return (
       <Dialog open={open} onClose={handleClose}>
           <DialogTitle sx={{ m: 'auto', p: '20px 30px' }}>Food added!</DialogTitle>
            <Box sx={{ m: 'auto', p: '0 30px 30px' }}>
                <Button sx={{ 
                        width: '120px',
                        height: '40px',
                        bgcolor: '#32a852',
                        color: 'white',
                        borderRadius: '4px',
                        mr: '9px',
                        '&:hover': {bgcolor: '#32a877'} }} 
                        onClick={handleRedirect}>Go To Diary</Button>
                    <Button sx={{ 
                        width: '120px',
                        height: '40px',
                        bgcolor: '#e1e6e2',
                        color: 'black',
                        borderRadius: '4px',
                        '&:hover': {bgcolor: '#e1e6f4'} }} 
                        onClick={handleClose}>Cancel</Button>
            </Box>
       </Dialog>
    )
}

const SearchResult = ({ name, food }) => {
    const authObj = auth.isAuthenticated()
    const [open, setOpen] = useState(false)
    const [openSignin, setOpenSignin] = useState(false)
    const [error, setError] = useState('')

    const [fat, setFat] = useState({})
    const [sodium, setSodium] = useState({})
    const [sugar, setSugar] = useState({})

    const [foodLog, setFoodLog] = useState({
        name: '',
        description: '',
        nutrients: []
    })

    useEffect(() => {
        const filteredNutrients = getBadNutrients(food.foodNutrients)
        setFat(filteredNutrients[0])
        setSodium(filteredNutrients[1])
        setSugar(filteredNutrients[2])

        setFoodLog({
            name: name,
            description: food.description,
            nutrients: filteredNutrients
        })
    }, [])

    const handleAddFood = () => {
        if (!authObj) {
            setOpenSignin(true)
            return
        } else {
            if (foodLog.name === '') {
                setError('Food is required.')
                return
            }
            console.log("food log", foodLog)
            // calling addFood api
            
            addFoodToDiary(foodLog, { token: authObj.token }).then(res => {
                if (res && res.error) {
                    setValues({ ...values, error: res.error })
                } else {
                // render the dialog to redirect user
                setOpen(true)
                }
            })
        }
    }

    const handleClose = () => setOpen(false)

    const handleCloseSignin = () => setOpenSignin(false)

    return (
    <Box sx={{ mt: '6px', lineHeight: '1.5em'}}>
        { error && <Typography sx={{ color: 'error.main', mt: '16px' }}>{error}</Typography> }
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
                <Typography variant='p' sx={{ color: '#385413' }}>{capitalizeFirstLetter(food.description)}</Typography>
                <Typography sx={{ fontSize: '12px' }}>{food.foodCategory}</Typography>
                <Typography sx={{ fontSize: '14px', display: 'inline' }}>Fat: { fat?.value || `0`}g</Typography>
                <Typography sx={{ fontSize: '14px', display: 'inline' }}> | Salt: { sodium?.value || `0`}mg</Typography>
                <Typography sx={{ fontSize: '14px', display: 'inline' }}> | Sugar: { sugar?.value || `0`}g</Typography>
            </Box>
            <Box>
                <Button onClick={handleAddFood}
                sx={{ bgcolor: 'secondary.main', color: 'secondary.contrastText', mt: '16px', '&:hover': { bgcolor: 'secondary.hover' } }}
                >Log</Button>
            </Box>
        </Box>
        <AddDiaryComplete open={open} onClose={handleClose} />
        <SignInDialog open={openSignin}  onClose={handleCloseSignin} />
        <Divider sx={{ mt: '10px' }} />
    </Box>
    )
} 

export default SearchResult