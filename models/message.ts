import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    company:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required: true
    },
    phone:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('Message',messageSchema)