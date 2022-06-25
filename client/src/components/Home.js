import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { TextField, Button,
    Box, Typography,
    DialogTitle, Dialog, 
} from '@mui/material'

import { addFoodToDiary } from '../diary/api-diary'
import auth from '../auth/auth-helper'
import SignInDialog from '../auth/SignInDialog'
import getBadNutrients from '../utils/getBadNutrients'
import { getFoodBySearchQuery } from './external-apis'
import useWindowDimension from '../hook/useWindowDimension'


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

const Home = () => {
    const authObj = auth.isAuthenticated()
    const isMobile = useWindowDimension() <= 860

    const [query, setQuery] = useState('')
    const [food, setFood] = useState({
        name: '',
        description: '',
        nutrients: []
    })
    const [search, setSearch] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [values, setValues] = useState({
        error: '',
        redirectToDiary: false,
    })
    const [open, setOpen] = useState(false)
    const [openSignin, setOpenSignin] = useState(false)

    useEffect(() => {
        // fetching data from USDA
        (async function() {
            if (!!search) {
                setIsLoading(true)

                const data = await getFoodBySearchQuery({ food: query })
                const nutrients = data.foods[0].foodNutrients
                const filteredNutrients = getBadNutrients(nutrients)
                setFood({ 
                    name: query, 
                    description: data.foods[0].description,
                    nutrients: filteredNutrients
                })
                
                setIsLoading(false)
            }
        })()
    }, [search])

    const handleSearchFoodChange = event => {
        setQuery(event.target.value)
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSubmit()
        }
    }

    const handleSubmit = async () => {
        if (!!query === false) {
            setValues({ ...values, error: 'Search field is required.' })
            return
        }
     
        //  set search state to query
        setSearch(query)
        setValues({ ...values, error: '' })
    }

    const handleAddFood = () => {
        if (!authObj) {
            setOpenSignin(true)
            return
        } else {
            if (food.name === '') setValues({ ...values, error: 'Food is required.' })
            // calling addFood api from backend
            addFoodToDiary(food, { token: authObj.token }).then(res => {
                if (res && res.error) {
                    setValues({ ...values, error: res.error })
                } else {
                // render the dialog to redirect user
                setOpen(true)
                setQuery('')
                }
            })
        }
    }

    const handleClose = () => setOpen(false)

    const handleCloseSignin = () => setOpenSignin(false)

    return (
    <Box sx={{ maxWidth: '370px', width: '540px', m: 'auto' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: '20px' }}>
            <Typography sx={{ mb: '18px' }}
            variant='h6'>Search Food For Nutrion</Typography>
            <Box sx={{ width: isMobile ? '80%' : '76%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <TextField 
                    id='outlined-basic' label='Search food' variant='outlined' name='searchFood'
                    onChange={handleSearchFoodChange}
                    onKeyPress={handleKeyPress}
                    value={query}
                    />
                    <Button sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', '&:hover': { bgcolor: 'primary.hover' }}}
                    onClick={handleSubmit}>Search</Button>
                </Box>
                { values.error && <Typography>{values.error}</Typography> }
                <Box sx={{ mt: '20px' }}>
                    {isLoading
                    ? <Typography variant='h6'>Loading...</Typography>
                    : 
                    (search && // nutrient values will be presented in graphs
                    <Box>
                        <Typography variant='h6'>Bad nutrients in {food?.name}</Typography>
                        <Typography>Saturated Fat: {food.nutrients[0]?.value + food?.nutrients[0]?.unitName.toLowerCase() || '0'}</Typography>
                        <Typography>Sodium: {food.nutrients[1]?.value + food.nutrients[1]?.unitName.toLowerCase()  || '0'}</Typography>
                        <Typography>Sugar: {food.nutrients[2]?.value + food.nutrients[2]?.unitName.toLowerCase()  || '0'}</Typography>
                    </Box>)
                    }
                </Box>
            </Box>
            <Button onClick={handleAddFood}
            sx={{ bgcolor: 'secondary.main', color: 'secondary.contrastText', mt: '30px', '&:hover': { bgcolor: 'secondary.hover' } }}
            >Add Food To Diary</Button>
            <AddDiaryComplete open={open} onClose={handleClose} />
            <SignInDialog open={openSignin}  onClose={handleCloseSignin} />
        </Box>
    </Box>
    )
}

export default Home