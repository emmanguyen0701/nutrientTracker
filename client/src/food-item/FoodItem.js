import React, { useState, useEffect } from 'react'

import { Grid,
} from '@mui/material'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'

import DeleteItem from './DeleteItem'
import { Item } from '../diary/Diary'
import capitalizeFirstLetter from '../utils/capitalizeString'


const FoodItem = ({ item, updateItemsInDiary }) => {
    const [deleteItemOpen, setDeleteItemOpen] = useState(false)
    const [fat, setFat] = useState({})
    const [sugars, setSugars] = useState({})
    const [salt, setSalt] = useState({})

    const handleDeleteItemOpen = () => setDeleteItemOpen(true)
    
    const handleDeleteItemClose= () => setDeleteItemOpen(false)

    useEffect(() => {
        for (const nutrient of item?.nutrientValues) {
            if (nutrient.nutrientId === 1258) {
                const obj = Object.create({})
                obj[1258] = nutrient
                setFat(obj)
            }
            if (nutrient.nutrientId === 2000) {
                const obj = Object.create({})
                obj[2000] = nutrient
                setSugars(obj)
            }
            if (nutrient.nutrientId === 1093) {
                const obj = Object.create({})
                obj[1093] = nutrient
                setSalt(obj)
            }
        }
    }, [item])

    return (
     <div>
        <Grid container spacing={1}>
            <Grid item xs={3}>
                <Item>{capitalizeFirstLetter(item?.description)}</Item> 
            </Grid>
            <Grid item xs={2}>
            {!!Object.keys(fat).length
            ?  <Item sx={{ bgcolor: 'beige' }}>{fat[1258]?.value}</Item>
            :  <Item sx={{ bgcolor: 'beige' }}>0</Item>}
            </Grid>
            
            <Grid item xs={2}>
            {!!Object.keys(sugars).length
            ?  <Item sx={{ bgcolor: 'beige' }}>{sugars[2000]?.value}</Item>
            :  <Item sx={{ bgcolor: 'beige' }}>0</Item>}
            </Grid> 

            <Grid item xs={2}>
            {!!Object.keys(salt).length
            ?  <Item sx={{ bgcolor: 'beige' }}>{salt[1093]?.value}</Item>
            :  <Item sx={{ bgcolor: 'beige' }}>0</Item>}
            </Grid>
           
            <Grid item xs={1}>
                <Item>
                    <RemoveCircleOutlineIcon sx={{ color: 'error.main', '&:hover': { cursor: 'pointer' } }} onClick={handleDeleteItemOpen}/>
                </Item>
            </Grid>
        </Grid>
        <DeleteItem  
            open={deleteItemOpen}
            onClose={handleDeleteItemClose}
            item={item} 
            onDeleteItem={updateItemsInDiary}
        />
    </div>)
}

export default FoodItem