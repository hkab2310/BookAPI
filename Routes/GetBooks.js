const Router = require("express").Router();
const Book = require("../Models/Book");

Router.get("/books",async(req,res)=>{
    try{
        const userName = req.userName;
        const books = await Book.find({BookUser:req.user});
        res.status(200).json({
            status : "Success",
            books: books
        })

    }catch(e){
        res.status(400).json({
            status: "failed",
            message: e.message
        })
    }
})

Router.get("/books/:id",async(req,res)=>{
    try{
        const id =req.params.id;
        const book =  await Book.find({_id:id,BookUser:req.user})
        res.status(400).json({
            status:"Success",
            book:book
        })
    }catch(e){
        res.status(400).json({
            status: "failed",
            message: e.message
        })
    }
})

module.exports=Router;