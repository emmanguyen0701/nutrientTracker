import mongoose from 'mongoose'
import { Schema } from 'mongoose'

import { NutritionValue } from './nutritionValue.model'

const FoodSchema = new Schema({
    name: {
        type: String,
        // required: true,
    },
    description: {
        type: String,
        // required: true,
    },
    nutrientValues: [Object]
})

FoodSchema.virtual('nutrients', {
    ref: 'NutritionValue',
    localField: '_id',
    foreignField: 'food',
})

const Food = mongoose.model('Food', FoodSchema)

export { Food, FoodSchema }