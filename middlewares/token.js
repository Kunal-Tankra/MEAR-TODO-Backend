import { sendErrorRes, sendInternalServerErrorRes } from "../utils/responses.js"
import jwt from 'jsonwebtoken'

export const authenticateAccessToken = (req, res, next) => {
    try {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {

            const accessToken = req.headers.authorization.split(' ')[1]

            jwt.verify(accessToken, process.env.JWT_SECRET, (err, decode) => {
                if (err?.message === 'jwt expired') {
                    sendErrorRes(res, 401, 'Access token expired')
                    return
                }
                else if (err) {
                    sendErrorRes(res, 400, 'Invalid access token')
                    return
                }

                req.user = decode

                next()
            })
        }
        else {
            sendErrorRes(res, 404, 'Access token is missing')
        }
    } catch (error) {
        sendInternalServerErrorRes(res, error.message)
    }
}