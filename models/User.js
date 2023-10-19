const mongoose = require('mongoose')
const validator = require('validator')

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'please provide name'],
        minlength:3,
        maxlength:50,
    },
    email:{
        type:String,
        required:[true, 'please provide email'],
        validate:{
            validator: validator.isEmail,
            maeesgae: 'please provide valid email',
        }
    },
    password:{
        type:String,
        required:[true, 'please provide password'],
        minlength:6,
    },
    role:{
        type:String,
        enum:['admin', 'user'],
        default: 'user'
    },
})

module.exports = mongoose.model('User', UserSchema)