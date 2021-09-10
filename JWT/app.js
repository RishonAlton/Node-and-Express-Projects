require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const mainRouter = require('./Routes/main')
const notFound = require('./Middleware/not-found')
const errorHandler = require('./Middleware/error-handler')


app.use(express.static('./Public'))
app.use(express.json())

app.use('/api', mainRouter)
app.use(notFound)
app.use(errorHandler)


const port = process.env.PORT || 5000

app.listen(port, console.log(`Server listening on Port ${port}...`))