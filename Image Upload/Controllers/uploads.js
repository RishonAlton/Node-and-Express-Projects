const path = require('path')
const { StatusCodes } = require('http-status-codes')
// const cloudinary = require('cloudinary').v2
// const fs = require('fs')

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


// const uploadImageToCloudinary = async (req, res) => {

//     const result = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
//         use_filename: true,
//         folder: 'file-upload'
//     })

//     fs.unlinkSync(req.files.image.tempFilePath)

//     return res.status(StatusCodes.OK).json({ image: result.secure_url })

// }


module.exports = uploadProductImage