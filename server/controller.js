let solos = require('./db.json')
let globalID = 1

module.exports={
    getSolos: (req, res)=>{
        res.status(200).send(solos)
    },
    deleteSolo: (req, res)=>{
        let index = solos.findIndex(elem => elem.id === +req.params.id)
        solos.splice(index, 1)
        res.status(200).send(solos)
    },
    createSolo: (req, res)=>{
        const {name, rating, logoURL} = req.body
        let newSolo = {
            id: globalID,
            name,
            rating,
            logoURL
        }
        solos.push(newSolo)
        globalID++
        res.status(200).send(solos)
    },
    updateSolo: (req, res)=>{
        const {id} = req.params
        const {type} = req.body
        let index = solos.findIndex(elem => +elem.id === +id)
        if (type === "minus" && solos[index].rating > 0){
            solos[index].rating -= 1
            res.status(200).send(solos)
        } else if(type === "plus" && solos[index].rating < 5){
            solos[index].rating += 1
            res.status(200).send(solos)
        } else{
            res.status(400).send(`Uhhhhhh`)
        }
    }
}