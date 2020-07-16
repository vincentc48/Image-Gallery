const { find, findByIdAndDelete } = require("./models/User");

const router = require("express").Router();
const Image = require("./models/Image");
const Joi = require('@hapi/joi')


//I don't know if i want to user Joi.url() because it might not accept something that redirects a folder inside this project
const schema = new Joi.object().keys({
    url: Joi.string()
})

router.get("/allimages",async (req,res)=>{
    const allimages = await Image.find();
    res.send(allimages)
})

router.post("/addimage", async (req,res)=>{
    const {error,value} = await schema.validate({url: req.body.url})
    if(error) return res.status(400).send({message: error.details[0].message})
    const imgObj = new Image({url: req.body.url, name: req.body.name, description: req.body.description})
    imgObj.save();
    return res.send("successfully added image")
})

router.delete('/deleteimage/:id',async (req,res)=>{
    try{
    const deleted = await Image.findByIdAndDelete(req.params.id)
    return res.send(deleted)
    } catch (err){
        return res.status(400).send(err)
    }
})

module.exports = router;