const nodemailer = require('nodemailer')
const sgMail = require('@sendgrid/mail')


const sendEmailEthereal = async (req, res) => {

    const testAccount = await nodemailer.createTestAccount()

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'sofia.borer@ethereal.email',
            pass: '6pGBFs2kEh6G9dB5UW'
        }
    })

    const info = await transporter.sendMail({
        from: '"Rick Sorkin" <ricksorkin@gmail.com>',
        to: 'bar@example.com',
        subject: 'Sending emails with Node.js',
        html: '<h1>Hello</h1>',
        text: 'This is an email sent with Node.js'
    })

    res.json(info)

}


const sendEmail = async (req, res) => {

    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    const message = {
        to: 'alton.rishon.03@gmail.com', 
        from: 'rishonalton@gmail.com', 
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }

    const info = await sgMail.send(message)

    res.json(info)

}


module.exports = sendEmail