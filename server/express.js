import express from 'express'
import path from 'path'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import devBundle from './devBundle'
import diaryRoutes from './routes/diary.routes'
import authRoutes from './routes/auth.routes'
import nutritionRoutes from './routes/nutrition.routes'

import template from '../template'

const CURRENT_WORKING_DIR = process.cwd()

const app = express()

devBundle.compile(app)

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200,
}

app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))

app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())

app.use('/auth', authRoutes)
app.use('/api/diary', diaryRoutes)
app.use('/api/nutrient', nutritionRoutes)

app.get('*', (req, res, next) => {
    res.set('Content-Type', 'text/html')
    res.send(template())
    next()
})


export default app
