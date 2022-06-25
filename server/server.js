import mongoose from 'mongoose'

import config from '../config/config'
import app from './express'


const db = mongoose.connect(config.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true})
        .then(() => {'Database connected'})
        .catch((err) => console.log(err))

app.listen(config.port, (err) => {
    if (err) console.log(err)
    console.log(`Server started on port ${config.port}`)
})

