const express = require('express')
const router = express.Router()

const { login, dashboard } = require('../Controllers/main')
const authentication = require('../Middleware/auth')


router.route('/login').post(login)
router.route('/dashboard').get(authentication, dashboard)


module.exports = router