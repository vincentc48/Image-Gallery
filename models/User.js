const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type:String,
        required: true,
        minlength: 1
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    images: {
        type: Array,
        required: true
    },
    info: {
        type: Object
    }
})

module.exports = mongoose.model("User",userSchema)