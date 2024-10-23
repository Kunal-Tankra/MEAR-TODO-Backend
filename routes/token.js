import express from 'express'
import { generateNewAccessToken } from '../controllers/token.js'

const router = express.Router()

router.get('/getAccessToken', generateNewAccessToken)

export default router