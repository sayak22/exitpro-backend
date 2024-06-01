const mongoose=require('mongoose')

const guardSchema = new mongoose.Schema({
    guardId:{
        type:Number,
        required:true,
        unique:true
    },
    guardName:{
        type:String,
        required:true
    },
    guardContact:{
        type:Number,
        required: true,
        unique:true
    },
    guardEmail:{
        type:String,
        required:true,
        unique:true
    },
    otp:{
        type:String,
        default:null    
    }
})

const Guard = mongoose.model('Guard', guardSchema)
module.exports=Guard