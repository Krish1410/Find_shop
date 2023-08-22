const jwt = require('jsonwebtoken');
const { getUser } = require('../helper');
require('dotenv').config()
async function auth(req,res,next){
    try{
        const token = req.header('Authorization').replace('Bearer ','');
        if(!token){
            return res.status(401).json({error:'No token Found'})
        }
        jwt.verify(token,process.env.TOKEN_SECERATE,async (err,decoded)=>{
            if(err){
                return res.status(403).json({error:err})
            }
            // if(!getUser(decoded.id)){
            //     return res.status(400).json({error:'No user Found'})
            // }
            var user = await getUser(decoded.id)
            if(!user._id){
                return res.status(401).json({error:user})
            }

            req.userId = decoded.id
            next();
        })
        
    }
    catch(error){
       return res.status(403).json({error:error.message})
    }
}
module.exports = auth