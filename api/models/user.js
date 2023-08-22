const mongoose = require('mongoose')

const userSchema =new mongoose.Schema({
    user_name : { type : String, required:true},
    user_email : { type : String, required:true,unique:true},
    user_password : { type : String, required:true},
    user_mobile : { type : Number,  required:true,minLength: 10},
    user_type : { type : String, required:true,enum:{
        values:['NormalUser','ShopOwner']
    }},
    user_address : { type : String, required:true}

},{timestamps:true})

const User = mongoose.model('User',userSchema)

module.exports = User