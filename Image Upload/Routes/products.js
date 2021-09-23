const express = require('express')
const router = express.Router()

const { getAllProducts, createProduct } = require('../Controllers/products')
const uploadProductImage = require('../Controllers/uploads')


router.route('/').get(getAllProducts).post(createProduct)
router.route('/uploads').post(uploadProductImage)


module.exports = router