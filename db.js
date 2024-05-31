const mongoose=require('mongoose')
require('dotenv').config()

const mongoURL=process.env.MONGO_URL_LOCAL;

mongoose.connect(mongoose.mongoURL,{
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

db.on('eroor',()=>{
    console.log('MongoDB connection error')
})

module.exports=db