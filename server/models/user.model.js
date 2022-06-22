import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const UserSchema = new Schema({
    gid: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    createdAt: {
        type: String,
        default: new Date(Date.now())
    }
})

const User = mongoose.model('User', UserSchema)

export default User