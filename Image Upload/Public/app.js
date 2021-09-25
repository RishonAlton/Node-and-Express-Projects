const productsContainer = document.querySelector('.products-section')
const form = document.querySelector('.form')
const nameInput = document.getElementById('name')
const priceInput = document.getElementById('price')
const imageInput = document.getElementById('image')

const url = '/api/products'
let imageValue


const fetchProducts = async () => {

    try {
        const { data } = await axios.get(url)
        productsContainer.innerHTML = data.products.map(product => {
            const { name, price, image } = product
            return (`
                <article class="product">
                <img src="${image}" alt="${name}" class="product-image">
                <div class="product-info">
                    <p class="product-name">${name}</p>
                    <p class="product-price">$${price}</p>
                </div>
                </article>
            `)
        }).join('')
    } 
    
    catch (error) {
        console.log(error)
    }

}


window.addEventListener('DOMContentLoaded', fetchProducts)


imageInput.addEventListener('change', async (e) => {

    const imageFile = e.target.files[0]
    const formData = new FormData()

    formData.append('image', imageFile)

    try {
        const { data } = await axios.post(`${url}/uploads`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        imageValue = data.image
    } 
    
    catch (error) {
        imageValue = null
        console.log(error)
    }

})


form.addEventListener('submit', async (e) => {

    e.preventDefault()

    const nameValue = nameInput.value
    const priceValue = priceInput.value

    try {
        const product = { name: nameValue, price: priceValue, image: imageValue }
        await axios.post(url, product)
        fetchProducts()
    } 
    
    catch (error) {
        console.log(error.response.data.message)
    }

    nameInput.value = ''
    priceInput.value = ''
    imageInput.value = null

})