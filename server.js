const express = require('express')
const mongoose = require('mongoose')
const session = require ('express-session')
const userRouter = require('./routers/userRouter')
const projectRouter = require('./routers/projectRouter')

require('dotenv').config()
const app = express()

app.use(express.json())
app.use(express.static("./assets"))
app.use(express.urlencoded({extended : true}))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}))
app.use(projectRouter)
app.use(userRouter)

app.listen(process.env.PORT, (err) => {
    if (err) { console.log(err); }
    else { console.log("connecté au serveur") }
})

app.get('*' ,(req,res)=>{
    res.redirect('/')
})
mongoose.connect(process.env.URIDB)