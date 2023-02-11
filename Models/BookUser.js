const mongoose = require('mongoose');

const bookUserSchema = new mongoose.Schema({
    userName : {type:String,unique:true,required:true},
    password : {type:String,required:true}
})

const BookUser = mongoose.model("BookUser",bookUserSchema);

module.exports=BookUser;