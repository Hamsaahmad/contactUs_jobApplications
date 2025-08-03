import express, { application, Request, Response } from 'express';
import { errors } from 'undici-types';
import cookieParser from 'cookie-parser'
require("dotenv").config()
const{connectDB} = require("./DB.ts")
const app = express()
const port = process.env.Port
const Message = require("./models/message")
import Application from "./models/Application";
const validatorMiddleWare = require("./middlewares/verificationMiddleWare")
import validator from 'validator';
interface SendMessageBody {
  companyInput: string;
  emailInput: string;
  messageInput: string;
  nameInput: string;
  phoneInput: string;
  subjectInput: string;
}

interface applicationBody{
  fullName : string;
  linkedIn : string,
  email : string;
  phone : string;
  specialist : string;
}



app.listen(port,() => {
    connectDB()
    console.log(`server is running on port ${port}`);
})

app.use(express.json())
app.use(cookieParser())
app.use(validatorMiddleWare())


function isLinkedInProfile(url : string) : Boolean {
  const linkedInRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|pub|company)\/[A-Za-z0-9_-]+\/?$/;
  return linkedInRegex.test(url.trim())
}


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

app.post("/jobApplication",async (req : Request<{},{},applicationBody> , res :Response) => {
  try{
    const {fullName , linkedIn , email , phone , specialist} = req.body
    if(! validator.isEmail(email)){
      return res.status(400).send("the email is not valid")
    }
    if(! isLinkedInProfile(linkedIn)){
      return res.status(400).send("linkedIn profile is not valid")
    }
    let app = new Application({
      fullName : fullName,
      linkedIn : linkedIn,
      email : email,
      phone : phone,
      specialist : specialist,
      createdAt : Date.now()
    })
    await app.save()
    return res.status(200).send("the application was registerd successfully")
}catch(err : unknown){
  if(err instanceof Error){
    console.log(err.message)
  }else{
    console.log(err)
  }
  return res.status(500).send("internal sever error")
}

})