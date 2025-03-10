const mongoose = require('mongoose')

const Schema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: [{
        type: String,
        default: "Employee" 
    }],
    active: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('User', Schema)