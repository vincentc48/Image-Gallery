const router = require('express').Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('./models/User.js');
const Image = require('./models/Image')
const Joi = require('@hapi/joi')


const schema = Joi.object().keys({
    username: Joi.string().min(1),
    password: Joi.string().min(6)
})

//simple check to see if logged in (is jwt token valid)
router.post("/isvalid",async (req,res)=>{
    try{
        var decoded = await jwt.verify(req.body.token,process.env.SECRET_KEY)
        return res.send(true);
    }catch{ return res.send(false); }
})

router.post("/username",async(req,res) =>{
    try{
        var decoded = await jwt.verify(req.body.token,process.env.SECRET_KEY)
        var user = await User.find({_id:decoded._id});
        user = user[0]; //if empty, this will throw an error and execute the catch statement
        return res.send(user.username)
    }catch{ return res.send(false); }
})

//get all images of that user, by token
router.post("/images", async (req,res)=>{
    try{
        const decoded = await jwt.verify(req.body.token,process.env.SECRET_KEY);
        
        var user = await User.find({_id:decoded._id});
        user = user[0]; //if empty, this will throw an error and execute the catch statement
        return res.send(user.images)
    }catch(err){
        res.status(400).send(err)
    }
})


//will send back and 200 status with error as message property in an object if there is an error
router.post("/register",async (req,res)=>{
    const {error,value} = await schema.validate({username: req.body.username,password: req.body.password})
    if (error) return res.send({message: error.details[0].message});
    const usersArr = await User.find({username: req.body.username})
    if(usersArr.length>0) return res.send({message: "Username already exists"})
    const hashedWord = await bcrypt.hash(req.body.password,10);
    const userObj = new User({
        username: req.body.username,
        password: hashedWord,
        images: [],
        info: {}
    })
    userObj.save();
    return res.send("Added User Successfully")
})

router.post('/login', async (req,res)=>{
   
    //Check Username
    var user = await User.find({username: req.body.username})
    if (user.length == 0) return res.status(400).send({message:"Incorrect Username or Password"});
    user = user[0];

    //Check Password
    const isPassword = await bcrypt.compare(req.body.password,user.password);
    if(!isPassword) return res.status(400).send({message:"Incorrect Username or Password"});

    //If both correct, send back jwt.
    const tokenVar = await jwt.sign({_id: user._id},process.env.SECRET_KEY)
    return res.send({token: tokenVar});
})

//add image to a user's collection
//use jwt to authorize action
router.post('/addimage/:imageid', async (req,res)=>{
    try{
        const decoded = await jwt.verify(req.body.token,process.env.SECRET_KEY);
        var image = await Image.find({_id:req.params.imageid})
        if(image.length ==0) return res.status(400).send("Image ID Not found")
        image = image[0];

        var user = await User.find({_id:decoded._id});
        user = user[0];

        user.images.push(image)
        user.save();
        return res.send("Image added to user's list");
    }catch(err){
        res.status(400).send(err);
    }
})


//delete image of id from a user's collection, post request to pass body easily
//use jwt to authorize action
router.post('/delete/:imageid',async (req,res)=>{
    try{
        const decoded = await jwt.verify(req.body.token,process.env.SECRET_KEY)
        var user = await User.find({_id:decoded._id})
        if (user.length==0) return res.status(400).send("User Not found")//reduntant because already know that decoded is a real user, but put here just for safety
        user = user[0];

        user.images = user.images.filter(element => {return element._id != req.params.imageid})
        user.save();
        return res.send("Deleted image from user collection successfully")
    }catch(error){
        return res.sendStatus(400)
    }
})


//use jwt to authorize action
router.delete('/deleteaccount',async (req,res)=>{
    try{
        const decoded = await jwt.verify(req.body.token,process.env.SECRET_KEY)
        await User.findByIdAndDelete(decoded._id)
        return res.send("Acccount deleted")
    }catch(error){
        return res.sendStatus(400)
    }
})

module.exports = router;