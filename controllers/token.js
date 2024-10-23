import { sendErrorRes, sendInternalServerErrorRes } from "../utils/responses.js"
import jwt from 'jsonwebtoken'
import { generateTokens } from "../utils/tokens.js"

export const generateNewAccessToken = async (req, res) => {
    try {

        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {

            const refreshToken = req.headers.authorization.split(' ')[1]

            jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decode) => {
                if (err?.message === 'jwt expired') {
                    sendErrorRes(res, 401, 'Refresh token expired')
                    return
                }

                // generate access token with 1 day access
                const { accessToken } = generateTokens(decode)

                res.send({
                    success: true,
                    accessToken
                })


            })
        }
        else {
            sendErrorRes(res, 404, 'Refresh token is missing')
        }
    } catch (error) {
        sendInternalServerErrorRes(res, error.message)
    }
}