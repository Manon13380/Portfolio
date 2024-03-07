const userModel = require('../models/userModel')
const projectModel = require('../models/projectsModel')
const nodemailer = require('nodemailer');
require('dotenv').config()
const bcrypt = require('bcrypt')

exports.getLogin = (req, res) => {
    try {
        req.session.destroy();
        console.log(req.session);
        res.render("login/index.html.twig")
    } catch (error) {
        res.send(error)
    }
}

exports.getHome = async (req, res) => {
    try {
        let emailMessage = req.session.emailMessage
        delete req.session.emailMessage
        let projects = await projectModel.find()
        res.render("home/index.html.twig", {
            projects: projects,
            emailMessage : emailMessage
        })
    } catch (error) {
        res.send(error)
    }
}

exports.getDashboard = async (req, res) => {
    try {
        let projects = await projectModel.find()
        res.render("dashboard/index.html.twig", {
            projects: projects
        })
    } catch (error) {
        res.send(error)
    }
}
exports.getAddForm = (req, res) => {
    try {
        res.render("addProject/index.html.twig")
    } catch (error) {
        res.send(error)
    }
}
exports.postLogin = async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.body.email })
        if (user) {
            if (await bcrypt.compare(req.body.password, user.password)) {
                req.session.user = user._id
                res.redirect('/dashboard')
            }
            else {
                throw { password: "Mauvais mot de passe" }
            }
        } else {
            throw { email: "Cet utilisateur n'est pas enregistré" }
        }
    } catch (error) {
        res.render("login/index.html.twig", {
            error: error
        })
    }
}

exports.getUpdateForm = (req, res) => {
    try {
        res.render("updateProject/index.html.twig")
    } catch (error) {
        res.send(error)
    }
}

exports.postSendMail = async (req, res) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            hôte: "smtp.gmail.com",
            port: 465,
            sécurisé: true,
            auth: {
                user: process.env.USER_MAIL,
                pass: process.env.USER_PW
            }
        });
        const email = req.body.email;
        const objet = req.body.objet;
        const message = req.body.message;

        const mailOptions = {
            from: process.env.USER_MAIL,
            to: process.env.USER_PERSO_MAIL,
            subject: "from : " + email + "/" + " Objet : " + objet,
            text: message
        };
        const info = await transporter.sendMail(mailOptions);
        console.log('E-mail envoyé: ' + info.response);
        req.session.emailMessage= "Votre message a bien ete envoyé"
        res.redirect('/#contact')
    } catch (error) {
        req.session.emailMessage= 'Une erreur est survenue lors de l\'envoi de l\'e-mail.'
    }
}