const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const db = require('./db')
const session = require('express-session')
require('dotenv').config()

const shopRouter = require('./Routes/shop')
const userRouter = require('./Routes/user')

const expressApp = express()

expressApp.use(cors())
expressApp.use(express.json())
expressApp.use(morgan('dev'))
expressApp.use(session({
  secret:'asdfghjkl',
  resave:false,
  saveUninitialized:true

}))
// All Routers MetionHere
expressApp.use('/shop',shopRouter)
expressApp.use('/user',userRouter)

var defaultResponse = {
  'statusCode':200,
  'message':'Success!!'
}

expressApp.get('/',async (req,res)=>{
  if(db){

    return res.json(defaultResponse).status(200)
  }
  else{
    return res.json({done:false}).status(200)

  }
})

const port = process.env.PORT

expressApp.listen(port,()=>{
    console.log(`Server is Running Successfully http://localhost:${port}`);
})