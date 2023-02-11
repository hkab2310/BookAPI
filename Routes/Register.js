const Router = require("express").Router();
const bodyParser = require("body-parser");
const BookUser = require("../Models/BookUser");

Router.use(bodyParser.json());
Router.use(bodyParser.urlencoded());

Router.post("/register",async (req,res)=>{
    try{
        const registerData = req.body;
        console.log(registerData);
        const user = await BookUser.create(req.body);
        res.status(200).json({
            status:"Success",
            createdUser : user
        })

    }catch(e){
        res.status(400).json({
            status:"failed",
            message : e.message
        })
    }
})

module.exports = Router