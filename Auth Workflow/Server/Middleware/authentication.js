const { UnauthenticatedError, ForbiddenError } = require('../Errors')
const { isTokenValid, attachCookiesToResponse } = require('../Utils')
const Token = require('../Models/Token')


const authenticateUser = async (req, res, next) => {

    const { accessToken, refreshToken } = req.signedCookies

    try {
        if (accessToken) {
            const payload = isTokenValid(accessToken)
            req.user = payload.user
            return next()
        }
        const payload = isTokenValid(refreshToken)
        const existingToken = await Token.findOne({ user: payload.user.userID, refreshToken: payload.refreshToken })
        if (!existingToken || !existingToken?.isValid) {
            throw new UnauthenticatedError('Authentication Invalid!')
        }
        attachCookiesToResponse({ res, user: payload.user, refreshToken: existingToken.refreshToken })
        req.user = payload.user
        next()
    } 

    catch (error) {
        throw new UnauthenticatedError('Authentication Invalid!')
    }

}


const authorizePermissions = (...roles) => {

    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new ForbiddenError('Unauthorized to access this Route!')
        }
        next()
    }

}


module.exports = {

    authenticateUser,
    authorizePermissions

}