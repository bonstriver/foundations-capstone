let teams = require('./db.json')
let globalID = 1

module.exports={
    getTeams: (req, res)=>{
        res.status(200).send(teams)
    },
    deleteTeam: (req, res)=>{
        let index = teams.findIndex(elem => elem.id === +req.params.id)
        teams.splice(index, 1)
        res.status(200).send(teams)
    },
    createTeam: (req, res)=>{
        const {name, rating, logoURL} = req.body
        let newTeam = {
            id: globalID,
            name,
            rating,
            logoURL
        }
        teams.push(newTeam)
        globalID++
        res.status(200).send(teams)
    },
    updateTeam: (req, res)=>{
        const {id} = req.params
        const {type} = req.body
        let index = teams.findIndex(elem => +elem.id === +id)
        if (type === "minus" && teams[index].rating > 0){
            teams[index].rating -= 1
            res.status(200).send(teams)
        } else if(type === "plus" && teams[index].rating < 5){
            teams[index].rating += 1
            res.status(200).send(teams)
        } else{
            res.status(400).send(`Uh oh. Something went wrong.`)
        }
    }
}