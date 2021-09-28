require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const stripeRoute = require('./stripe-controller')
const notFoundRoute = require('./Middleware/not-found')
const errorHandler = require('./Middleware/error-handler')


app.use(express.json())
app.use(express.static('./Public'))

app.post('/stripe', stripeRoute)

app.use(notFoundRoute)
app.use(errorHandler)


const port = process.env.PORT || 3000

app.listen(port, console.log(`Server is listening on Port ${port}`))