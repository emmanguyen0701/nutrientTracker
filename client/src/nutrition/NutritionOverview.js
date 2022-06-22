import React from 'react'

import { Grid,
} from '@mui/material'

import { Item } from '../diary/Diary'

const NutritionOverview = ({ nutrientCategories }) => {
    return (
        <Grid container spacing={1}>
            <Grid item xs={3}>
                <Item sx={{ fontWeight: '600' }}>Total</Item>
            </Grid>
            <Grid item xs={2}>
                <Item sx={{ fontWeight: '600' }}>
                    {(nutrientCategories['Saturated Fat'] && parseFloat(nutrientCategories['Saturated Fat']).toFixed(2)) || 0}
                </Item>
            </Grid>
            <Grid item xs={2}>
                <Item sx={{ fontWeight: '600' }}>
                    {(nutrientCategories['Sugars'] && parseFloat(nutrientCategories['Sugars']).toFixed(2)) || 0}
                </Item>
            </Grid>            
            <Grid item xs={2}>
                <Item sx={{ fontWeight: '600' }}>
                    {(nutrientCategories['Salt'] && parseFloat(nutrientCategories['Salt']).toFixed(2)) || 0}
                    </Item>
            </Grid>
        </Grid>
        
    )
}

export default NutritionOverview
