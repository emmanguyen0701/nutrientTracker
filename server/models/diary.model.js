import mongoose from 'mongoose'
import { Schema } from 'mongoose'

import { FoodSchema } from './food.model'
import User from './user.model'
import removeTime from '../helpers/removeTime'

const DiarySchema = new Schema({
    user: {
        ref: User,
        type: Schema.Types.ObjectId,
    },
    food: [ FoodSchema ],
    added_on: {
        type: Date,
        default: removeTime(new Date()),
    },
})

const Diary = mongoose.model('Diary', DiarySchema)

export default Diary