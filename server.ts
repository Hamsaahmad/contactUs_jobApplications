import express, { Request, Response } from 'express';
import { errors } from 'undici-types';
import cookieParser from 'cookie-parser'
require("dotenv").config()
const{connectDB} = require("./DB.ts")
const app = express()
const port = process.env.Port
const Message = require("./models/message")
import validator from 'validator';
interface SendMessageBody {
  companyInput: string;
  emailInput: string;
  messageInput: string;
  nameInput: string;
  phoneInput: string;
  subjectInput: string;
}

app.listen(port,() => {
    connectDB()
    console.log(`server is running on port ${port}`);
})

app.use(express.json())
app.use(cookieParser())

app.post('/sendMessage',async (req : Request<{},{},SendMessageBody>, res: Response) => {
    try{
    const {companyInput, emailInput , messageInput, nameInput , phoneInput , subjectInput} = req.body
    if(!(typeof emailInput === 'string' && validator.isEmail(emailInput))){
        return res.status(400).send({message:"invalid email"})
    }
    if(typeof messageInput !== "string" || typeof nameInput !== "string" || typeof phoneInput !== "string" || typeof subjectInput !== "string" || typeof companyInput !== "string" ){
        return res.status(400).send("invalid input")
    }
    let message = new Message({
        company : companyInput,
        email : emailInput,
        message : messageInput,
        name : nameInput,
        phone : phoneInput,
        subject : subjectInput,
    })
    await message.save()
    res.status(200).send("the message was delevired successfully")
}catch(err:unknown){
      if (err instanceof Error) {
    console.error("Error:", err.message);
  } else {
    console.error("Unknown error", err);
  }
  return res.status(500).send("internal server error")
}
})