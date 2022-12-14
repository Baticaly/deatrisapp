const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: false
    },
    os: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Form = mongoose.model('Form', userSchema)

module.exports = Form