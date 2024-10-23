import { User } from "../models/user.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { generateTokens } from "../utils/tokens.js"
import { sendErrorRes, sendInternalServerErrorRes } from "../utils/responses.js"

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()

        res.status(200).send({
            success: true,
            users
        })
    } catch (err) {
        res.status(500).send({
            success: false,
            message: 'Failed to fetch users',
            error: err.message
        }
        )
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne(
            { email }
        ).select("+password").lean()

        if (!user) {
            sendErrorRes(res, 404, 'Invalid email or password')
            return
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const tokens = generateTokens(user)
            const userData = { ...user }
            delete userData.password
            res.send({
                success: true,
                tokens,
                userData,
                message: `Welcome back, ${user.name}`
            })
        }
        else {
            sendErrorRes(res, 401, 'Invalid login credentials')
        }
    } catch (err) {
        sendInternalServerErrorRes(res, err.message)


    }
}

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body

        let user = await User.findOne(
            { email }
        )

        if (user) {

            sendErrorRes(res, 409, 'User already exists')
            return
        }

        // save
        const hashedPassword = await bcrypt.hash(password, 10)
        user = await User.create({
            name,
            email,
            password: hashedPassword
        })


        const tokens = generateTokens(user)

        res.send({
            success: true,
            tokens,
            message: 'Registered successfully'
        })
    } catch (err) {
        sendInternalServerErrorRes(res, err.message)



    }
}

export const getMyProfile = async (req, res) => {
    try {

        const { _id } = req.user
        const user = await User.findById(_id)


        res.send({
            success: true,
            user
        })
    } catch (error) {
        sendInternalServerErrorRes(res, error.message)
    }
}