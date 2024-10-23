export const sendInternalServerErrorRes = (res, errMsg) => {
    res.status(500).send({
        success: false,
        message: 'Internal server error',
        error: errMsg
    }
    )
}

export const sendErrorRes = (res, statusCode, message) => {
    res.status(statusCode).send({
        success: false,
        message
    })
}