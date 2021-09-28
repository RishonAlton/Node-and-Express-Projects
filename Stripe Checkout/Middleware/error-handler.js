const { CustomAPIError } = require('../Errors')
const { StatusCodes } = require('http-status-codes')


const errorHandler = (error, req, res, next) => {

    if(error instanceof CustomAPIError) {
        return res.status(error.statusCode).json({ message: error.message })
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Something went wrong, please try again later')

}


module.exports = errorHandler