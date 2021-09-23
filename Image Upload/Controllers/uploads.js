const path = require('path')
const { StatusCodes } = require('http-status-codes')

const CustomError = require('../Errors')


const uploadProductImage = async (req, res) => {

    if(!req.files) {
        throw new CustomError.BadRequestError('No File uploaded')
    }

    const productImage = req.files.image

    if(!productImage.mimetype.startsWith('image')) {
        throw new CustomError.BadRequestError('Please upload an Image')
    }

    if(productImage.size > (1024 * 1024)) {
        throw new CustomError.BadRequestError('Please upload Image smaller than 1MB')
    }

    const imagePath = path.join(__dirname, `../Public/Uploads/${productImage.name}`)
    await productImage.mv(imagePath)

    return res.status(StatusCodes.OK).json({ image: `/uploads/${productImage.name}` })

}


module.exports = uploadProductImage