const crypto = require('crypto')

const User = require('../Models/User')
const Token = require('../Models/Token')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../Errors')
const { attachCookiesToResponse, createTokenUser, sendVerificationEmail, sendResetPasswordEmail, createHash } = require('../Utils')


const register = async (req, res) => {

    const { name, email, password } = req.body

    const emailAlreadyExists = await User.findOne({ email })

    if (emailAlreadyExists) {
        throw new BadRequestError('The provided email is already registered!')
    }

    const isFirstAccount = await User.countDocuments({}) === 0
    const role = isFirstAccount ? 'admin' : 'user'
    const verificationToken = crypto.randomBytes(40).toString('hex')

    const user = await User.create({ name, email, password, role, verificationToken })

    const origin = 'http://localhost:3000'

    await sendVerificationEmail({
        name: user.name,
        email: user.email,
        verificationToken: user.verificationToken,
        origin
    })

    res.status(StatusCodes.CREATED).json({ message: 'Account created! Please check your email to verify your account.' })

}


const login = async (req, res) => {

    const { email, password } = req.body

    if (!email || !password) {
        throw new BadRequestError('Please provide email and password')
    }

    const user = await User.findOne({ email })

    if (!user) {
        throw new UnauthenticatedError('Invalid Credentials!')
    }

    const isPasswordCorrect = await user.comparePassword(password)

    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid Credentials!')
    }

    if (!user.isVerified) {
        throw new UnauthenticatedError('Please verify your email')
    }

    const tokenUser = createTokenUser(user)

    let refreshToken = ''
    const existingToken = await Token.findOne({ user: user._id })

    if (existingToken) {
        const { isValid } = existingToken
        if (!isValid) {
            throw new UnauthenticatedError('Invalid Credentials!')
        }
        refreshToken = existingToken.refreshToken
        attachCookiesToResponse({ res, user: tokenUser, refreshToken })
        return res.status(StatusCodes.OK).json({ user: tokenUser })
    }

    refreshToken = crypto.randomBytes(40).toString('hex')
    const userAgent = req.headers['user-agent']
    const IP = req.ip

    const userToken = { refreshToken, IP, userAgent, user: user._id }
    await Token.create(userToken)

    attachCookiesToResponse({ res, user: tokenUser, refreshToken })

    res.status(StatusCodes.OK).json({ user: tokenUser })

}


const logout = async (req, res) => {

    await Token.findOneAndDelete({ user: req.user.userID })

    res.cookie('accessToken', '', {
        httpOnly: true,
        expires: new Date(Date.now())
    })

    res.cookie('refreshToken', '', {
        httpOnly: true,
        expires: new Date(Date.now())
    })

    res.status(StatusCodes.OK).json({ message: 'User logged out!' })

}


const verifyEmail = async (req, res) => {

    const { verificationToken, email } = req.body

    const user = await User.findOne({ email })

    if (!user) {
        throw new UnauthenticatedError('Verification Failed!')
    }

    if (verificationToken !== user.verificationToken) {
        throw new UnauthenticatedError('Verification Failed!')
    }

    user.isVerified = true
    user.verified = Date.now()
    user.verificationToken = ''

    await user.save()

    res.status(StatusCodes.OK).json({ message: 'Email verified!' })

}


const forgotPassword = async (req, res) => {

    const { email } = req.body

    if (!email) {
        throw new BadRequestError('Please provide your email')
    }

    const user = await User.findOne({ email })

    if (user) {
        const passwordToken = crypto.randomBytes(70).toString('hex')
        const origin = 'http://localhost:3000'
        await sendResetPasswordEmail({
            name: user.name,
            email: user.email,
            token: passwordToken,
            origin
        })
        const passwordTokenExpiration = new Date(Date.now() + (1000 * 60 * 10))
        user.passwordToken = createHash(passwordToken)
        user.passwordTokenExpiration = passwordTokenExpiration
        await user.save()
    }

    res.status(StatusCodes.OK).json({ message: 'Please check your email to reset your password.' })

}


const resetPassword = async (req, res) => {

    const { token, email, password } = req.body

    if (!token || !email || !password) {
        throw new BadRequestError('Please provide all the values')
    }

    const user = await User.findOne({ email })

    if (user) {
        if (user.passwordToken === createHash(token) && (user.passwordTokenExpiration > new Date())) {
            user.password = password
            user.passwordToken = null
            user.passwordTokenExpiration = null
            await user.save()
        }
    }

    res.status(StatusCodes.OK).json({ message: 'Password successfully resetted!' })

}


module.exports = {

    register,
    login,
    logout,
    verifyEmail,
    forgotPassword,
    resetPassword

}