const path = require("path")

const express = require('express')
const app = express();
const apiroute = require('./api.js')
const authroute = require("./auth.js")

const mongoose = require("mongoose");

const dotenv = require('dotenv')
dotenv.config()

app.use(express.json())

mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true, useUnifiedTopology: true },()=>{console.log("connected to MongoDB")})

app.use('/api',apiroute)
app.use('/auth',authroute)


if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"client","build")));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,"client","build","index.html"))
    })
}

const port = process.env.PORT || 5000

app.listen(port,()=>{console.log(`server running on port: ${port}`)})