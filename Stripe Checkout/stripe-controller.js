const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)


const stripeController = async (req, res) => {

    const { purchase, totalAmount, shippingFee } = req.body

    const calculateOrderAmount = () => totalAmount + shippingFee

    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(),
        currency: 'usd'
    })

    res.json({ clientSecret: paymentIntent.client_secret })

}


module.exports = stripeController