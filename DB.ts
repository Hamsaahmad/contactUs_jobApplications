import mongoose from "mongoose";
require("dotenv").config()

const connectDB = async () => {
    try{
        let connectionString = process.env.mongoconnectionString
        if(! connectionString){
            console.log("no connection String found")
            return
        }
        const connection = await mongoose.connect(connectionString);
        console.log("connected successfully");
    }catch(err : unknown){
        if(err instanceof Error){
            console.log(err.message)
        }else{
            console.log(err)
        }
        console.log("couldn't connect to the database")
    }
}

module.exports = {connectDB}