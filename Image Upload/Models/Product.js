const mongoose = require('mongoose')


const ProductSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Name cannot be empty']
    },

    price: {
        type: Number,
        required: [true, 'Price cannot be empty']
    },

    image: {
        type: String,
        required: [true, 'Image cannot be empty']
    }

})


module.exports = mongoose.model('Product', ProductSchema)