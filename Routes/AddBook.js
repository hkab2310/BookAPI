const Router = require("express").Router();
const bodyParser = require("body-parser");
const Book = require("../Models/Book");

Router.use(bodyParser.json());
Router.use(bodyParser.urlencoded());

Router.post("/books",async(req,res)=>{
    try{
        const bookDetails = req.body;
        // console.log(req.user);
        const newBook = await Book.create({
            BookUser: req.user,
            ...bookDetails
        })
        res.status(200).json({
            status:"Success",
            newBook: newBook
        })
    }catch(e){
        res.status(400).json({
            status: "failed",
            message: e.message
        })
    }
})

module.exports = Router;