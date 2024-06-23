const express = require('express')
const { users } = require('./model/index')
const app = express()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require("./model/index")

app.set('view engine','ejs')

app.use(express.urlencoded({extended: true}))  //ssr
app.use(express.json())     //external like react,vuejs

app.get('/',(req,res)=>{
    res.render('home.ejs')
})

app.get("/register",(req,res)=>{
    res.render('auth/register')
})
app.post("/register",async(req,res)=>{
    // console.log(req.body)
    const {username,password,email}=req.body
if(!username || !password || !email){
    return res.send("please provide username,email, password")
}
// const data=await users.findAll({
//     where:{
//         email:email
//     }
// })
// if(data.length>0){
//     return res.send("Already registered email")
// }
  await  users.create({
        email,
        password:bcrypt.hashSync(password,10),
        username
    })
    res.send("Registered successfully")
})

app.get("/login",(req,res)=>{
    res.render('auth/login.ejs')
})
app.post("/login",async(req,res)=>{
    const {email,password}=req.body
    if(!email || !password){
        return res.send("Please provide email, password")
    }
    // email check
   const [data] = await users.findAll({
    where:{
        email:email
    }
   })
   if(data){
    // next password check garne
    const isMatched=bcrypt.compareSync(password,data.password)
    if(isMatched){
        const token = jwt.sign({id:data.id},'hahaah',{expiresIn:'30d'}) //tokenExpireTime

        res.cookie('jwtToken',token)
        console.log(token)
        res.send("Loged in success")
    }else{
        res.send("Invalid email/pasword")
    }
   }else{
    res.send("No user with that email")
   }
})

app.use(express.static('public/css/'))


app.listen(3006,()=>{
    console.log("Project has started at port 3006")
})