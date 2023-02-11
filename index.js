const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require("jsonwebtoken");
SECRET = "RESTAPI";
var BookUser;

const registerRoute = require("./Routes/Register"); 
const loginRoute = require("./Routes/Login");
const getBookRoute = require("./Routes/GetBooks");
const addBookRoute = require("./Routes/AddBook");
const deleteBookRoute = require("./Routes/DeleteBook");

const app = express();

app.use(cors());
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With,Content-Type,Accept");
    next();
})

app.use("/",registerRoute);
app.use("/",loginRoute);

//authorization
mongoose.connect('mongodb+srv://root-instaclone:instacloneHKA@cluster0.vqsgmeu.mongodb.net/?retryWrites=true&w=majority',{useNewURLParser :true,})
    .then(()=>{
        console.log("connected to database");
    }).catch((err)=>{
        console.log(err);
    })

app.use("/books",async (req,res,next)=>{
    const token = req.headers.authorization.split("Bearer ")[1];
    if(!token){
        return res.status(400).json({
            status:"failed",
            message : "token is missing"
        })
    }
    jwt.verify(token,SECRET,(err,decoded)=>{
        if(err){
            return res.status(400).json({
                status: "failed",
                message : "token is invalid"
            })
        }
        else{
            req.user= decoded.data;
            // console.log(req.user)
            next();
        }
    })
})

app.use("/",getBookRoute);
app.use("/",addBookRoute);
app.use("/",deleteBookRoute);

app.listen(3000,()=>{
    console.log("Server running at port 3000");
})    