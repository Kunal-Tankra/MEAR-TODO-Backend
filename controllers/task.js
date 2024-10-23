import { Task } from "../models/task.js"
import { sendErrorRes, sendInternalServerErrorRes } from "../utils/responses.js"

export const createTask = async (req, res) => {
    try {
        const { title, description } = req.body
        const user = req.user._id

        if (!title || !description) {
            sendErrorRes(res, 400, 'Missing title or description')
        }

        const task = await Task.create({
            title, description, user
        })

        res.status(201).send({
            success: true,
            message: 'Task created successfully',
            task
        })

    } catch (error) {
        sendInternalServerErrorRes(res, error.message)
    }
}

export const getAllTasks = async (req, res) => {
    try {
        const userId = req.user._id

        let tasks = await Task.find({ user: userId, isCompleted: false }).sort({ createdAt: -1 })



        if (!tasks || tasks.length === 0) {
            sendErrorRes(res, 404, 'No tasks found')
            return
        }

        res.send({
            success: true,
            tasks
        })



    } catch (error) {
        sendInternalServerErrorRes(res, error.message)
    }
}

export const updateTask = async (req, res) => {
    try {
        const { title, description } = req.body
        const taskId = req.params.id

        const data = {
            title,
            description,
            updatedAt: Date.now()
        }

        const updatedTask = await Task.findByIdAndUpdate(taskId, data, { new: true })

        if (!updateTask) {
            sendErrorRes(res, 404, 'Task not found')
        }

        res.send({
            success: true,
            message: 'Task updated successfully',
            updatedTask
        })

    } catch (error) {
        sendInternalServerErrorRes(res, error.message)
    }
}

export const updateStatus = async (req, res) => {
    try {
        const { isCompleted } = req.body
        const taskId = req.params.id

        const data = {
            isCompleted,
            updatedAt: Date.now()
        }

        const updatedTask = await Task.findByIdAndUpdate(taskId, data, { new: true })

        if (!updateTask) {
            sendErrorRes(res, 404, 'Task not found')
        }

        res.send({
            success: true,
            message: 'Task status updated successfully',
            updatedTask
        })

    } catch (error) {
        sendInternalServerErrorRes(res, error.message)
    }
}

export const getTask = async (req, res) => {
    try {
        const taskId = req.params.id

        const task = await Task.findById(taskId)

        if (!task) {
            sendErrorRes(res, 404, 'Task not found')
        }

        res.send({
            success: true,

        })


    } catch (error) {
        sendInternalServerErrorRes(res, error.message)
    }
}

export const deleteTask = async (req, res) => {
    try {
        const taskId = req.params.id

        const task = await Task.findByIdAndDelete(taskId)

        if (!task) {
            sendErrorRes(res, 404, 'Task not found')
        }

        res.send({
            success: true,
            message: 'Task deleted successfully',
            _id: task._id
        })
    } catch (error) {
        sendInternalServerErrorRes(res, error.message)
    }
}

export const getCompletedTasks = async (req, res) => {
    try {
        const userId = req.user._id

        const tasks = await Task.find({ user: userId, isCompleted: true }).sort({ createdAt: -1 })

        if (!tasks || tasks.length === 0) {
            sendErrorRes(res, 404, 'No tasks found')
            return
        }

        res.send({
            success: true,
            tasks
        })

    } catch (error) {
        sendInternalServerErrorRes(res, error.message)
    }
}