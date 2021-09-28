const stripe = Stripe('pk_test_51JTrxaSGuQ4Y8GpgN4TDcpoyPMSJrfc4lRPjVWFGjS41DAQjpBB1z7AmcAfBENSk5gxQUuze8XrcDHP9qmBwZrE500UlvcQf7D')


const purchase = [
  { id: '1', name: 'Honor 8X', price: 20000 },
  { id: '2', name: 'iPhone XR', price: 60000 },
]

const totalAmount = purchase.reduce((total, item) => total += item.price, 0)
const shippingFee = 1099


document.querySelector("button").disabled = true


fetch("/stripe", {

  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ purchase, totalAmount, shippingFee })

})

  .then(function(result) {
    return result.json()
  })

  .then(function(data) {
    const elements = stripe.elements()
    const style = {
      base: {
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },
      invalid: {
        fontFamily: 'Arial, sans-serif',
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
    const card = elements.create("card", { style: style })
    card.mount("#card-element")
    card.on("change", function (event) {
      document.querySelector("button").disabled = event.empty
      document.querySelector("#card-error").textContent = event.error ? event.error.message : ""
    })
    const form = document.getElementById("payment-form")
    form.addEventListener("submit", function(event) {
      event.preventDefault()
      payWithCard(stripe, card, data.clientSecret)
    })
  })


const payWithCard = function(stripe, card, clientSecret) {

  loading(true)

  stripe
    .confirmCardPayment(clientSecret, {
      payment_method: {
        card: card
      }
    })
    .then(function(result) {
      if (result.error) {
        showError(result.error.message)
      } else {
        orderComplete(result.paymentIntent.id)
      }
    })

}


const orderComplete = function(paymentIntentId) {

  loading(false)

  document
    .querySelector(".result-message a")
    .setAttribute(
      "href",
      "https://dashboard.stripe.com/test/payments/" + paymentIntentId
    )

  document.querySelector(".result-message").classList.remove("hidden")
  document.querySelector("button").disabled = true

}


const showError = function(errorMessageText) {

  loading(false)

  const errorMessage = document.querySelector("#card-error")
  errorMessage.textContent = errorMessageText

  setTimeout(function() {
    errorMessage.textContent = "";
  }, 4000)

}


const loading = function(isLoading) {

  if (isLoading) {
    document.querySelector("button").disabled = true
    document.querySelector("#spinner").classList.remove("hidden")
    document.querySelector("#button-text").classList.add("hidden")
  } 
  
  else {
    document.querySelector("button").disabled = false
    document.querySelector("#spinner").classList.add("hidden")
    document.querySelector("#button-text").classList.remove("hidden")
  }

}
