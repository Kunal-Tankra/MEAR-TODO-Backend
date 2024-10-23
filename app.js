import { config } from 'dotenv'
import express from 'express'
import userRouter from './routes/user.js'
import tokenRouter from './routes/token.js'
import cors from 'cors'
import taskRouter from './routes/task.js'

export const app = express()

// connect env
config({ path: './data/config.env' })

// middlewares
app.use(express.json())
app.use(cors())

// routers
app.use('/api/v1/user', userRouter)
app.use('/api/v1', tokenRouter)
app.use('/api/v1/task', taskRouter)