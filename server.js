const express=require('express')
const app=express(); 
const bodyParser=require('body-parser')
app.use(bodyParser.json)
require('dotenv').config()
// const db=require('./db.js')

app.get('/',(req,res)=>{
    console.log('Welcome to ExitPro!')
})


//Now I have to implement the routes
const securityRoute=require('./routers/securityRoute')
app.get('/security',securityRoute);


const PORT=process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})