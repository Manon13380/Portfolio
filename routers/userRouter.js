const userRouter = require('express').Router()
const userController= require('../controllers/userController')
const authguard = require('../customDependencies/authguard')



userRouter.get('/login', userController.getLogin)
userRouter.post('/login', userController.postLogin)
userRouter.get('/', userController.getHome)
userRouter.get('/dashboard', authguard, userController.getDashboard)
userRouter.get('/AddFormulaire',authguard, userController.getAddForm)
userRouter.get('/UpdateFormulaire',authguard, userController.getUpdateForm)
userRouter.post('/sendMail', userController.postSendMail)

module.exports = userRouter
