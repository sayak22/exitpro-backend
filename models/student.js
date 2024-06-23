const mongoose=require('mongoose')

const studentSchema = new mongoose.Schema({
    roll_number:{
        type:Number,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true
    },
    contact:{
        type:Number,
        required: true,
        unique:true
    },
    hostel:{
        type:String,
        required:true
    },
    room_number:{
        type:Number,
        required:true
    },
    fine:{
        type:Number,
        required:true
    }
})

const Student = mongoose.model('Student', studentSchema)
module.exports=Student