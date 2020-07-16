const mongoose = require('mongoose');
const Schema = mongoose.Schema

const imageSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    name: {
        type: String,
    },
    description: {
        type: String
    }
})

module.exports = mongoose.model("image",imageSchema);