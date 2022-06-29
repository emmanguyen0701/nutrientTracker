import React, { useState, useEffect } from 'react'
import Flatpickr from "react-flatpickr"
import { ResponsiveWaffleHtml } from '@nivo/waffle'

import { Grid,
    Box, Typography,
} from '@mui/material'
import "flatpickr/dist/themes/material_orange.css"

import { getNutritionByCategory } from '../nutrition/api-nutrition'
import auth from '../auth/auth-helper'
import removeTime from '../utils/removeTime'

const today = removeTime()

const NutrientWaffle = () => {
    const [error, setError] = useState('')
    const [dateSelected, setDateSelected] = useState(today)
    const [dataSodium, setDataSodium] = useState([
        { id: 'Salt', 
        label: 'Salt', 
        value: 0,  
        }])

    const [dataSugars, setDataSugars] = useState([{ 
        id: 'Sugars', 
        label: 'Sugars', 
        value: 0,  
    }])

    const [dataFat, setDataFat] = useState([{ 
        id: 'Saturated Fat', 
        label: 'Saturated Fat', 
        value: 0,
    }])

    const authObj = auth.isAuthenticated()
  
    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal

        getNutritionByCategory(
            { token: authObj.token }, 
            { dateSelected: dateSelected },
            signal)
        .then(res => {
            if (res && res.error) setError(res.error)
            else {
                for (const v of Object.keys(res)) {
                    if (v === 'Salt') {
                        setDataSodium([{ 
                            id: 'Salt', 
                            label: 'Salt', 
                            value: res[v],  
                        }])
                    }
                    if (v === 'Sugars') {
                        setDataSugars([ { 
                            id: 'Sugars', 
                            label: 'Sugars', 
                            value: res[v],  
                        }])
                    }
                    if (v === 'Saturated Fat') {
                        setDataFat([ {
                            id: 'Saturated Fat', 
                            label: 'Saturated Fat', 
                            value: res[v],
                        }])
                    }
                }
                setError('')
            }
        })
       
        return () => controller.abort()
    }, [dateSelected])

    const handleDateChange = date => {
        setDateSelected(date)
        setError('')
    }

    return (
    <Box sx={{ ml: '20px' }}>
        <Box sx={{ display: 'flex', m: '16px 0 20px 0px' }}>
            <Typography variant='h6'>Choose a day</Typography>
            <Flatpickr style={{ marginLeft: '12px' }}
            options={{ maxDate: today }}
            value={dateSelected}
            onChange={([date]) => handleDateChange(date)}
        />
        </Box>
        {error 
        ? <Typography>{error}</Typography>
        : (<Grid container>
            <Grid item sx={{ width: '320px', m: '0 20px 20px 0' }}>
                <Typography sx={{ fontSize: '16px' }}>Recommended Saturated Fat Intake: 13g</Typography>
                <Box sx={{ height: '240px', width: '240px', display: 'flex', alignItems: 'end' }}>
                    <ResponsiveWaffleHtml 
                        data={dataFat}
                        total={13}
                        rows={14}
                        columns={14}
                        padding={1}
                        colors={{ scheme: 'spectral' }}
                    />
                    {!!dataFat[0].value && 
                    <Typography sx={{ fontSize: '18px', ml: '16px' }}>{parseInt((dataFat[0].value/13)*100)}%</Typography>} 
                </Box>
            </Grid>
            <Grid item sx={{ width: '320px', m: '0 20px 20px 0' }}>
                <Typography sx={{ fontSize: '16px' }}>Recommended Sugars Intake: 24g</Typography>
                <Box sx={{ height: '240px', width: '240px', display: 'flex', alignItems: 'end' }}>
                    <ResponsiveWaffleHtml 
                    data={dataSugars}
                    total={24}
                    rows={14}
                    columns={14}
                    padding={1}
                    colors={{ scheme: 'accent' }}
                    />
                    {!!dataSugars[0].value && 
                    <Typography sx={{ ml: '16px', fontSize: '18px' }}>{parseInt((dataSugars[0].value/24)*100)}%</Typography>} 
                </Box>
            </Grid>
            <Grid item sx={{ width: '320px', m: '0 20px 20px 0' }}>
                <Typography sx={{ fontSize: '16px' }}>Recommended Salt Intake: 1500mg</Typography>
                <Box sx={{ height: '240px', width: '240px', display: 'flex', alignItems: 'end' }}>
                    <ResponsiveWaffleHtml 
                    data={dataSodium}
                    total={1500}
                    rows={14}
                    columns={14}
                    padding={1}
                    colors={{ scheme: 'category10' }}
                    />
                    {!!dataSodium[0].value && 
                    <Typography sx={{ ml: '16px', fontSize: '18px' }}>{parseInt((dataSodium[0].value/1500)*100)}%</Typography>} 
                </Box>
            </Grid>
        </Grid>)}
    </Box>
    )
}

export default NutrientWaffle