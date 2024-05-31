const express=require('express')
require('dotenv').config()
const app=express(); 
const db=require('./db.js')
const bodyParser=require('body-parser')
app.use(bodyParser.json())

app.get("/",(req,res)=>{
    res.send('Welcome to ExitPro!')
})


//Now I have to implement the routes
const studentRoute=require("./routers/studentRoute")
app.use("/student",studentRoute);
const guardRoute=require("./routers/guardRoute")
app.use("/guard",guardRoute);
// const securityRoute=require("./routers/securityRoute")
// app.use('/security',securityRoute);


const PORT=process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})