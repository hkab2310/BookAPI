const mongoose = require('mongoose');
const BookUser = require('./BookUser');

const bookSchema = new mongoose.Schema({
    Title : {type:String,required:true},
    Author : {type:String,required:true},
    ISBN : {type:String,required:true},
    Publisher : {type:String,required:true},
    PublishedDate : {type:Date,default:new Date()},
    Description : {type:String,required:true},
    BookUser : {type:mongoose.Types.ObjectId,ref:'BookUser'}
})

const Book = mongoose.model("Book",bookSchema);

module.exports=Book;