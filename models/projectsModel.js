const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    name : {
        type : String,
        required :[true, "Le nom est requis"]
    },
    description :{
        type: String,
        required : [true, "La description est requise"]
    },
    url : {
        type : String,
    },
    urlGithub : {
        type : String,
        required : [true, "L'url de github est requise"]
    },
    image : {
        type : String,
        default: "Projet.jpg"
    }
})

const projectModel = mongoose.model("Projects", projectSchema)
module.exports = projectModel