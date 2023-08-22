require('dotenv').config()
const jwt  = require('jsonwebtoken')
const User = require('./models/user')

function generateToken(userId){
    return jwt.sign({id:userId},process.env.TOKEN_SECERATE,{expiresIn:'1d'})
}

async function getUser(userId){
    try{

        return await User.findOne({_id:userId})
    }
    catch(error){
        return error.message
    }
}

module.exports.generateToken = generateToken
module.exports.getUser = getUser