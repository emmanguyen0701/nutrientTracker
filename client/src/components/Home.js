import React, { useState, useEffect } from 'react'

import { TextField, Button,
    Box, Typography,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

import { getFoodBySearchQuery } from './external-apis'
import useWindowDimension from '../hook/useWindowDimension'
import SearchResult from './SearchResult'

const Home = () => {
    const isMobile = useWindowDimension() <= 860

    const [query, setQuery] = useState('')
    const [foodArr, setFoodArr] = useState([])

    const [search, setSearch] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [values, setValues] = useState({
        error: '',
        redirectToDiary: false,
    })

    useEffect(() => {
        // fetching data from USDA
        (async function() {
            if (!!search) {
                setIsLoading(true)

                const data = await getFoodBySearchQuery({ food: query })

                const foodArr = []
                for (let i = 0; i < data.foods.length; i++) {
                    foodArr.push(data.foods[i])
                }
                // create a table to render food description, catetogry and nutritions
                setFoodArr(foodArr)

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
     
        //  set search state to the query user input
        setSearch(query)
        setValues({ ...values, error: '' })
    }

    return (
        <Box sx={{ paddingBottom: '40px' }}>
            <Box sx={{  minWidth: '370px', width: '760px', maxWidth: '100%', m: 'auto', pb: '40px' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: '16px' }}>
                    <Typography sx={{ mb: '18px', mt: '12px' }}
                    variant='h6'>Search Food For Nutrients</Typography>
                    <Box sx={{ width: isMobile ? '90%' : '70%' }}>
                        <Box sx={{ width: '100%', display: 'flex', mt: '10px',
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
                        { values.error && <Typography sx={{ color: 'error.main', mt: '16px' }}>{values.error}</Typography> }
                        <Box sx={{ pt: '18px' }}>
                            {isLoading
                            ? <Typography sx={{ mt: '10px' }} variant='h6'>Loading...</Typography>
                            : 
                            (search && // nutrient values presented in table
                            foodArr.map((food, index) => (
                                <SearchResult key={index} name={query} food={food} />
                            ))
                        )}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Home