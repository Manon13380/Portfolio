const projectRouter = require('express').Router()
const projectController = require('../controllers/projectController')
const multer = require ('../customDependencies/multer-config')

projectRouter.post('/addFormulaire', multer.single("image"), projectController.postProject )
projectRouter.get('/deleteProject/:projectid', projectController.deleteProject)
projectRouter.get('/updateProject/:projectid', projectController.renderUpdateProject)
projectRouter.post('/updateProject/:projectid', multer.single("image"), projectController.updateProject)

module.exports = projectRouter