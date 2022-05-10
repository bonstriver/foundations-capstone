const solosContainer = document.querySelector('#solo-container')
const form = document.querySelector('form')
const baseURL = `http://localhost:5151/api/solos`

const solosCallback = ({ data: solos }) => displaySolos(solos)
const errCallback = err => console.log(err.response.data)

const getAllSolos = () => axios.get(baseURL).then(solosCallback).catch(errCallback)
const createSolo = body => axios.post(baseURL, body).then(solosCallback).catch(errCallback)
const deleteSolo = id => axios.delete(`${baseURL}/${id}`).then(solosCallback).catch(errCallback)
const updateSolo = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(solosCallback).catch(errCallback)

function submitHandler(e) {
    e.preventDefault()

    let name = document.querySelector('#soloName')
    let rating = document.querySelector('input[name="ratings"]:checked')
    let logoURL = document.querySelector('#logoURL')

    let bodyObj = {
        name: name.value,
        rating: rating.value, 
        logoURL: logoURL.value
    }

    createSolo(bodyObj)

    name.value = ''
    rating.checked = false
    logoURL.value = ''
}

function createSoloCard(solo) {
    const soloCard = document.createElement('div')
    soloCard.classList.add('solo-card')

    soloCard.innerHTML = `<img alt='solo cover' src=${solo.logoURL} class="solo-cover"/>
    <p class="solo-name">${solo.name}</p>
    <div class="btns-container">
        <button onclick="updateSolo(${solo.id}, 'minus')">-</button>
        <p class="solo-rating">${solo.rating} stars</p>
        <button onclick="updateSolo(${solo.id}, 'plus')">+</button>
    </div>
    <button onclick="deleteSolo(${solo.id})">delete</button>
    `
    solosContainer.appendChild(soloCard)
}

function displaySolos(arr) {
    solosContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createSoloCard(arr[i])
    }
}

form.addEventListener('submit', submitHandler)
// form.addEventListener('button', displaySolos)

getAllSolos()