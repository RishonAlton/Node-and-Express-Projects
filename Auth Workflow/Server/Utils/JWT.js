const jwt = require('jsonwebtoken')


const createJWT = ({ payload }) => jwt.sign(payload, process.env.JWT_SECRET)


const isTokenValid = (token) => jwt.verify(token, process.env.JWT_SECRET)


const attachCookiesToResponse = ({ res, user, refreshToken }) => {

    const accessTokenJWT = createJWT({ payload: {user} })
    const refreshTokenJWT = createJWT({ payload: {user, refreshToken} })

    res.cookie('accessToken', accessTokenJWT, {
        httpOnly: true,
        expires: new Date(Date.now() + (1000 * 60 * 60 * 24)),
        secure: process.env.NODE_ENV === 'production',
        signed: true
    })

    res.cookie('refreshToken', refreshTokenJWT, {
        httpOnly: true,
        expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 30)),
        secure: process.env.NODE_ENV === 'production',
        signed: true
    })

}


module.exports = {

    createJWT,
    isTokenValid,
    attachCookiesToResponse

}