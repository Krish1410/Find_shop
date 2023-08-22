const express = require('express')
const User = require('../models/user');
const helper = require('../helper');
const auth = require('../middleware/auth');
const Shop = require('../models/shop');
const router = express.Router()

router.get('/', (req, res) => {
    console.log(req.session.cookie);
    res.json({ statusCode: 200, message: 'User Api Works' })
})

router.post('/create', auth, async (req, res) => {
    try {
        if ((req.body.user_mobile.toString()).length != 10) {
            return res.status(401).json({ error: 'InValid mobile number' })
        }
        const existingUser = await User.findOne({ user_email: req.body.user_email })
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already associated with another account' });
        }
        const newUser = new User(req.body)
        await newUser.save()
        let token = helper.generateToken(newUser._id)
        return res.status(201).json({
            statusCode: 201,
            message: "User created successfully",
            data: {
                tokenType: 'Bearer',
                token: token
            }
        })
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ error: error.message });
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ user_email: email })
        if (!user) {
            return res.status(404).json({ error: 'Email or Password is Invalid' })
        }
        if (password !== user.user_password) {
            return res.status(404).json({ error: 'Email or Password is Invalid' })
        }
        const token = helper.generateToken(user._id)
        return res.status(201).json({
            statusCode: 201,
            message: "Login successfully",
            data: {
                tokenType: 'Bearer',
                token: token
            }
        })
    }
    catch (error) {
        return res.status(400).json({ error: error.message })
    }
})

router.get('/shops',auth,async (req,res)=>{
    try{
        var user = helper.getUser(req.userId)
        var shops = await Shop.find({user_id : req.userId})
        if(shops.length  == 0){
            return res.status(200).json({
                statusCode:200,
                message:'No shops found for this user',
                user:user,
                data:[]
            })
    }
    return res.status(200).json({
        statusCode:200,
        message:'No shops found for this user',
        user:user,
        data:shops
    })
}
    
    catch(error){
       return res.status(400).json({error:error.message})
    }
})
module.exports = router