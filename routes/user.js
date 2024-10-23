import express from 'express'
import { getAllUsers, getMyProfile, login, register } from '../controllers/user.js'
import { authenticateAccessToken } from '../middlewares/token.js'

const router = express.Router()

router.get('/all', getAllUsers)
router.post('/login', login)
router.post('/register', register)
router.get('/me', authenticateAccessToken, getMyProfile)

export default router