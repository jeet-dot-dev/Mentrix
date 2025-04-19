import express from 'express'
import cors from 'cors'
import {config} from 'dotenv'
import { CORS_ORIGIN }  from './config/index'
import helmet from 'helmet'
import questionRoute from './routes/question.route'
config()

const app = express()

// middleware
app.use(cors({
    origin: CORS_ORIGIN,
    credentials: true
}))
app.use(express.json())
app.use(helmet())
app.use(express.urlencoded({ extended: true }));


// routes
app.use('/api/v1', questionRoute);

export default app