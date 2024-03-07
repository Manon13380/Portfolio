const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "L'adresse mail est requise"],
        validate: {
            validator: function (v) {
                return /^[a-z0-9\_\%]+[\.+@+^[A-z0-9\-]+\.[a-z]{2,}$/.test(v)
            },
            message: "entrez un mail valide"
        }
    },
    password: {
        type: String,
        required: [true, "Le mot de passe est requis"],
        validate: {
            validator: function (v) {
                return /^[A-z0-9\-\/]{8,}$/.test(v)
            },
            message: "entrez un mot de passe valide"
        }
    }
})


const userModel = mongoose.model("User", userSchema)
module.exports = userModel
