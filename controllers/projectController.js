const projectModel = require('../models/projectsModel')


exports.postProject = async (req, res) => {
    try {
        let newProject = new projectModel(req.body)
        if (req.file) {
            if (req.multerError) {
                throw { errorUpload: "Le fichier n'est pas valide" };
            }
            req.body.image = req.file.filename;
            newProject.image = req.file.filename
        }
        newProject.validateSync()
        await newProject.save()
        res.redirect('/dashboard')
    } catch (error) {
        console.log(error.message)
        res.render('addProject/index.html.twig')
    }
}

exports.getProject = async (req, res) => {
    try {
        let projects = await projectModel.findOne()
        res.render("dashboard/index.html.twig", {
            projects: projects
        })
    } catch (error) {
        res.send(error)
    }
}
exports.renderUpdateProject = async (req, res) => {
    try {
        let project = await projectModel.findOne({ _id: req.params.projectid })
        res.render("updateProject/index.html.twig", {
            project: project
        })
    } catch (error) {
        res.send(error)
    }
}

exports.deleteProject = async (req, res) => {
    try {
        await projectModel.deleteOne({ _id: req.params.projectid })
        res.redirect("/dashboard")
    } catch (error) {
        res.render('dashboard/index.html.twig', {
            errorDelete: 'un problème est survenue pendant la supression',
        })
    }
}
exports.updateProject = async (req, res) => {
    try {
        let projectUpdated = await projectModel.updateOne({ _id: req.params.projectid }, req.body)
        if (req.file) {
            if (req.multerError) {
                throw { errorUpload: "Le fichier n'est pas valide" };
            }
            req.body.image = req.file.filename;
            projectUpdated.image = req.file.filename
        }
        await projectModel.updateOne({ _id: req.params.projectid }, req.body)
        res.redirect("/dashboard")
    } catch (error) {
        res.render('updateProject/index.html.twig', {
            errorUpdate: 'un problème est survenue pendant la modification',
        })
    }
}

