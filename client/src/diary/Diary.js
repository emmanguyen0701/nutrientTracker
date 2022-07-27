import React, { useState, useEffect, useReducer } from 'react'
import { useParams } from 'react-router-dom'
import Flatpickr from "react-flatpickr"

import { styled } from '@mui/material/styles'
import { Grid, Paper,
    Box, Typography,
} from '@mui/material'
import "flatpickr/dist/themes/material_orange.css"

import { getDiary } from './api-diary'
import { getNutritionByCategory } from '../nutrition/api-nutrition'

import auth from '../auth/auth-helper'
import FoodItem from '../food-item/FoodItem'
import NutritionOverview from '../nutrition/NutritionOverview'
import removeTime from '../utils/removeTime'

let today = removeTime() 

const initial_state = { added_on: today }

const selectDateReducer = (state, [type, payload]) => {
    switch(type) {
        case 'diaryFetched': {
            return { ...payload }
        }
    }
    return state
}

export const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    borderRadius: '1px',
    boxShadow: '0 0 0 0',
}))

const Diary = () => {
    const [state, dispatch] = useReducer(selectDateReducer, initial_state)
    const [nutrientCategories, setNutrientCategories] = useState({})

    const [error, setError] = useState('')

    const params = useParams()
    const authObj = auth.isAuthenticated()
  
    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal

        // get the diary information from the backend.
        getDiary(signal, 
            { userId: params.userId }, 
            { token: authObj.token },
            { added_on: initial_state.added_on }
            ).then(res => {
            if (res && res.error) setError(res.error)
            else {
                dispatch(['diaryFetched', res])
            }
        })

        // get the sum of nutrition values based on date selected.
        getNutritionByCategory(
            { token: authObj.token }, 
            { dateSelected: initial_state.added_on },
            signal)
        .then(res => {
            if (res && res.error) setError(res.error)
            else {
                setNutrientCategories(res)
            }
        })
       
        return () => controller.abort()
    }, [initial_state])


    // update diary when users delete food items
    const updateItemsInDiary = (item) => {
        const controller = new AbortController()
        const signal = controller.signal
        
        const diaryToUpdate = { ...state }
        const itemIndex = diaryToUpdate.food?.findIndex(f => f._id.toString() === item._id.toString())
        diaryToUpdate.food?.splice(itemIndex, 1)
        dispatch(['diaryFetched', diaryToUpdate])

        getNutritionByCategory(
            { token: authObj.token }, 
            { dateSelected: state.added_on },
            signal)
        .then(res => {
            if (res && res.error) setError(res.error)
            else {
                setNutrientCategories(res)
                setError('')
            }
        }) 
    }

    // get diary with selected date.
    const handleDateChange = date => {
        const controller = new AbortController()
        const signal = controller.signal

        getDiary(signal, 
            { userId: params.userId }, 
            { token: authObj.token },
            { added_on: removeTime(date) }
            ).then(res => {
            if (res && res.error) setError(res.error)
            else {
                dispatch(['diaryFetched', res])
                setError('')
            }
        })

        getNutritionByCategory(
            { token: authObj.token }, 
            { dateSelected: removeTime(date) },
            signal)
        .then(res => {
            if (res && res.error) setError(res.error)
            else {
                setNutrientCategories(res)
                setError('')
            }
        })
    }

    return (
    <Box>
        <Box sx={{ display: 'flex', m: '16px 0 20px 14px' }}>
            <Typography variant='h6'>Your Diary For </Typography>
            <Flatpickr style={{ marginLeft: '12px' }}
            options={{ maxDate: today }}
            value={initial_state.added_on}
            onChange={([date]) => handleDateChange(date)}
            />
        </Box>
        {error
        ?<Typography sx={{ ml: '15px' }}>{error}</Typography>
        : (<Box>
            <Grid container spacing={1}>
                <Grid item xs={3}>
                    <Item sx={{ fontWeight: '600' }}>Food</Item>
                </Grid>
                <Grid item xs={2}>
                    <Item sx={{ fontWeight: '600' }}>Fat (g)</Item>
                </Grid>                
                <Grid item xs={2}>
                    <Item sx={{ fontWeight: '600' }}>Sugars (g)</Item>
                </Grid>                
                <Grid item xs={2}>
                    <Item sx={{ fontWeight: '600' }}>Salt (mg)</Item>
                </Grid>
                <Grid item xs={1}>
                    <Item>Delete</Item>
                </Grid>
            </Grid>
            
            {state.food?.map((f, idx) => (
                !!f
                ? <FoodItem key={idx} item={f} updateItemsInDiary={updateItemsInDiary} />
                : null
                ))}
            <NutritionOverview nutrientCategories={nutrientCategories}/>
        </Box>)}
    </Box>
    )
}

export default Diary