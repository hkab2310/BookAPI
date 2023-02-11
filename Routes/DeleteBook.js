const Router = require("express").Router();
const Book = require("../Models/Book");

Router.delete("/books/:title",async(req,res)=>{
    try{
        const title = req.params.title;
        const result = await Book.deleteOne({Title:title,BookUser:req.user});
        res.status(200).json({
            status:"Success",
            result
        })
    }catch(e){
        res.status(400).json({
            status: "failed",
            message: e.message
        })
    }
})

module.exports = Router;