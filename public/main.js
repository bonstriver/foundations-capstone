const teamsContainer = document.querySelector('#team-container')
const form = document.querySelector('form')
const baseURL = `http://localhost:5151/api/teams`

const teamsCallback = ({ data: teams }) => displayTeams(teams)
const errCallback = err => console.log(err.response.data)

const getAllTeams = () => axios.get(baseURL).then(teamsCallback).catch(errCallback)
const createTeam = body => axios.post(baseURL, body).then(teamsCallback).catch(errCallback)
const deleteTeam = id => axios.delete(`${baseURL}/${id}`).then(teamsCallback).catch(errCallback)
const updateTeam = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(teamsCallback).catch(errCallback)

function submitHandler(e) {
    e.preventDefault()

    let name = document.querySelector('#teamName')
    let rating = document.querySelector('input[name="ratings"]:checked')
    let logoURL = document.querySelector('#logoURL')

    let bodyObj = {
        name: name.value,
        rating: rating.value, 
        logoURL: logoURL.value
    }

    createTeam(bodyObj)

    name.value = ''
    rating.checked = false
    logoURL.value = ''
}

function createTeamCard(team) {
    const teamCard = document.createElement('div')
    teamCard.classList.add('team-card')

    teamCard.innerHTML = `<img alt='team cover' src=${team.logoURL} class="team-cover"/>
    <p class="team-name">${team.name}</p>
    <div class="btns-container">
        <button onclick="updateTeam(${team.id}, 'minus')">-</button>
        <p class="team-rating">${team.rating} stars</p>
        <button onclick="updateTeam(${team.id}, 'plus')">+</button>
    </div>
    <button onclick="deleteTeam(${team.id})">delete</button>
    `


    teamsContainer.appendChild(teamCard)
}

function displayTeams(arr) {
    teamsContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createTeamCard(arr[i])
    }
}

form.addEventListener('submit', submitHandler)
// form.addEventListener('button', displayTeams)

getAllTeams()