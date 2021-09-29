require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const sendEmail = require('./send-email')
const notFoundRoute = require('./Middleware/not-found')
const errorHandler = require('./Middleware/error-handler')


app.get('/', (req, res) => {
    res.send(`<h1>Email Project</h1> <a href="/send">Send Email</a>`)
})

app.get('/send', sendEmail)


app.use(notFoundRoute)
app.use(errorHandler)


const port = process.env.PORT || 3000

app.listen(port, console.log(`Server is listening on Port ${port}...`))