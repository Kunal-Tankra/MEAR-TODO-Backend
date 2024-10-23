import jwt from 'jsonwebtoken'

export const generateTokens = (user) => {
    // const accessToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
    // const refreshToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '10d' })
    const accessToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
    const refreshToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)

    return {
        accessToken, refreshToken
    }
}

