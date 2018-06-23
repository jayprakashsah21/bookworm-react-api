import express from 'express'
import path from 'path'
import mongoose from 'mongoose'
import auth from './routes/auth'
import users from './routes/users'
import books from './routes/books'
import bodyParser from 'body-parser'
import User from './modules/User'
import dotenv from 'dotenv'
import Promise from 'bluebird'

const app=express();
dotenv.config();
app.use(bodyParser.json());

//overriding mongoose promise with bluebird Promise
mongoose.Promise=Promise;
mongoose.connect("mongodb://localhost/bookworm",{ useMongoClient: true });

/*
app.post("/api/auth",(req,res)=>{
  res.status(400).json({error:{global:"Invalid credentials"}});
});
*/

app.use("/api/auth",auth);
app.use("/api/users",users);
app.use("/api/books",books);

app.get("/*",(req,res)=>{
  res.sendFile(path.join(__dirname,"index.html"));

});

app.listen(8080,()=>console.log("running on localhost:8080"));
