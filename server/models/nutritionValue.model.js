import mongoose from 'mongoose'
import { Schema } from 'mongoose'

import { Food } from './food.model'

const NutritionValueSchema = new Schema({
    nutrientId: {
        type: Number,
        required: true,
    },
    nutrientName: {
        type: String,
        required: true,
    },
    unitName: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
    food: {
        ref: "Food",
        type: Schema.Types.ObjectId,
    }
})

const NutritionValue = mongoose.model('NutritionValue', NutritionValueSchema)

export { NutritionValue, NutritionValueSchema }
