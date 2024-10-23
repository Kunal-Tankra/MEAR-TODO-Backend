import express from 'express'
import { createTask, deleteTask, getAllTasks, getCompletedTasks, getTask, updateStatus, updateTask } from '../controllers/task.js'
import { authenticateAccessToken } from '../middlewares/token.js'

const router = express.Router()

// post
router.post('/create', authenticateAccessToken, createTask)

// put
router.put('/update/:id', authenticateAccessToken, updateTask)
router.put('/updateStatus/:id', authenticateAccessToken, updateStatus)

// get
router.get('/all', authenticateAccessToken, getAllTasks)
router.get('/completed', authenticateAccessToken, getCompletedTasks)
router.get('/:id', authenticateAccessToken, getTask)

// delete
router.delete('/:id', authenticateAccessToken, deleteTask)



export default router