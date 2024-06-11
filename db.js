const mongoose=require('mongoose')
require('dotenv').config()

// const mongoURL= process.env.MONGODB_URL_LOCAL
const mongoURL= process.env.MONGODB_URL

mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})

const db=mongoose.connection;

db.on('connected',()=>{
    console.log('MongoDB connected')
})

db.on('disconnected',()=>{
    console.log('Disconnected from MongoDB')
})

db.on('error',()=>{
    console.error('MongoDB connection error', error)
})

module.exports=db