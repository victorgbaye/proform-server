const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const UserSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:[true, 'please provide first name'],
        minlength:3,
        maxlength:50,
    },
    lastname:{
        type:String,
        required:[true, 'please provide last name'],
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
    // role:{
    //     type:String,
    //     enum:['admin', 'user'],
    //     default: 'user'
    // },
})
UserSchema.pre('save', async function () {
    // console.log(this.modifiedPaths());
    // console.log(this.isModified('name'));
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });

  UserSchema.methods.comparePassword = async function (canditatePassword) {
    const isMatch = await bcrypt.compare(canditatePassword, this.password);
    return isMatch;
  };

module.exports = mongoose.model('User', UserSchema)