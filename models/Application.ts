import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    linkedIn:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    specialist:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

export default mongoose.model('Application',applicationSchema)