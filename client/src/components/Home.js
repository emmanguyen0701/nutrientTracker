import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { TextField, Button,
    Box, Typography,
    DialogTitle, Dialog, 
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

import HealthyInfo from './HealthyInfo'
import { addFoodToDiary } from '../diary/api-diary'
import auth from '../auth/auth-helper'
import SignInDialog from '../auth/SignInDialog'
import getBadNutrients from '../utils/getBadNutrients'
import { getFoodBySearchQuery } from './external-apis'
import useWindowDimension from '../hook/useWindowDimension'
import capitalizeFirstLetter from '../utils/capitalizeString'


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
            if (food.name === '') {
                setValues({ ...values, error: 'Food is required.' })
                return
            }
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
        <Box>
            <Box sx={{  minWidth: '370px', width: '600px', maxWidth: '100%', m: 'auto' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: '20px' }}>
                    <Typography sx={{ mb: '18px' }}
                    variant='h6'>Search Food For Nutrients</Typography>
                    <Box sx={{ width: isMobile ? '90%' : '70%' }}>
                        <Box sx={{ width: '100%', display: 'flex',
                        '& .css-u3kf4b-MuiInputBase-root-MuiOutlinedInput-root': {
                            borderRadius: '4px 0px 0px 4px'
                        }}}>
                            <TextField 
                            id='outlined-basic' label='Search food' variant='outlined' name='searchFood'
                            onChange={handleSearchFoodChange}
                            onKeyPress={handleKeyPress}
                            value={query}
                            fullWidth/>
                            <Button sx={{ 
                                bgcolor: 'primary.main', 
                                color: 'primary.contrastText', '&:hover': { bgcolor: 'primary.hover' },
                                padding: '13.2px 8px',
                                borderRadius: '0 4px 4px 0',
                                borderLeft: '0px solid black'

                            }}
                            onClick={handleSubmit}>
                                <SearchIcon sx={{ fontSize: '30px' }} />
                            </Button>
                        </Box>
                        { values.error && <Typography>{values.error}</Typography> }
                        <Box sx={{ mt: '20px' }}>
                            {isLoading
                            ? <Typography variant='h6'>Loading...</Typography>
                            : 
                            (search && // nutrient values presented in table
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant='h6'>Bad Nutrients in {capitalizeFirstLetter(food?.name)}</Typography>
                                <Box sx={{ marginTop: '16px', display: 'flex', width: '100%', minWidth: '340px', justifyContent: 'space-between' }}>
                                    <div style={{ dislay: 'flex', flexDirection: 'column' }}>
                                        <Typography sx={{ fontWeight: '600', fontSize: '26px' }}>{food.nutrients[0]?.value + food?.nutrients[0]?.unitName.toLowerCase() || '0'}</Typography>
                                        <Typography sx={{ fontSize: '14px' }}>Saturated Fat</Typography>
                                    </div>
                                    <div style={{ dislay: 'flex', flexDirection: 'column' }}>
                                        <Typography sx={{ fontWeight: '600', fontSize: '26px' }}>{food.nutrients[1]?.value + food.nutrients[1]?.unitName.toLowerCase()  || '0'}</Typography>
                                        <Typography sx={{ fontSize: '14px' }}>Sodium</Typography>
                                    </div>
                                    <div style={{ dislay: 'flex', flexDirection: 'column' }}>
                                        <Typography sx={{ fontWeight: '600', fontSize: '26px' }}>{food.nutrients[2]?.value + food.nutrients[2]?.unitName.toLowerCase()  || '0'}</Typography>
                                        <Typography sx={{ fontSize: '14px' }}>Sugar</Typography>
                                    </div>
                                </Box>
                            </Box>)}
                        </Box>
                    </Box>
                    <Button onClick={handleAddFood}
                    sx={{ bgcolor: 'secondary.main', color: 'secondary.contrastText', mt: '16px', '&:hover': { bgcolor: 'secondary.hover' } }}
                    >Add Food To Diary</Button>
                    <AddDiaryComplete open={open} onClose={handleClose} />
                    <SignInDialog open={openSignin}  onClose={handleCloseSignin} />
                </Box>
            </Box>
            <HealthyInfo />
        </Box>
    )
}

export default Home