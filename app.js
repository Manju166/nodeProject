const express = require('express')
const app = express()

require("./model/index")

app.set('view engine','ejs')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.get('/',(req,res)=>{
    res.render('home.ejs')
})

app.get("/register",(req,res)=>{
    res.render('auth/register.ejs')
})
app.post("/register",(req,res)=>{
    console.log(req.body)
})

app.get("/login",(req,res)=>{
    res.render('auth/login.ejs')
})

app.use(express.static('public/css/'))


app.listen(3306,()=>{
    console.log("Project has started at port 3306")
})