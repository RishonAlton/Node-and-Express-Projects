require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const fileUpload = require('express-fileupload')

const connectDB = require('./DB/connect')
const router = require('./Routes/products')

const errorHandler = require('./Middleware/error-handler')
const notFoundRoute = require('./Middleware/not-found')

// const cloudinary = require('cloudinary').v2


// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.CLOUD_API_KEY,
//     api_secret: process.env.CLOUD_API_SECRET
// })


app.use(express.static('./Public'))
app.use(express.json())
app.use(fileUpload())
// app.use(fileUpload({ useTempFiles: true, tempFileDir: '/images/' }))

app.use('/api/products', router)

app.use(errorHandler)
app.use(notFoundRoute)


const port = process.env.PORT || 5000


const start = async () => {

    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening on Port ${port}...`))
    } 
    
    catch (error) {
        console.log(error)
    }

}


start()


