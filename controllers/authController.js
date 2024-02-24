const { StatusCodes } = require('http-status-codes');
const customError = require('../errors');
const User = require('../models/User')
const { attachCookiesToResponse, createTokenUser, createJWT } = require('../utils');

const register = async(req,res) => {
    const { firstname, lastname, email, password } = req.body;

    const emailAlreadyExists = await User.findOne({ email });
    if (emailAlreadyExists) {
      throw new customError.BadRequestError('Email already exists');
    }

    const user = await User.create({ name, email, password });
    const tokenUser = {firstnamename:user.firstname, lastname: user.lastname, email:user.email, userId: user._id}
    attachCookiesToResponse({res, user:tokenUser})
    res.status(StatusCodes.CREATED).json({ user:tokenUser });
};

// login
const login = async(req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        throw new customError.BadRequestError('please provide email and password')
    }
    const user = await User.findOne({ email });
    if (!user) {
        throw new customError.UnauthenticatedError('Invalid Credentials');
      }
      const isPasswordCorrect = await user.comparePassword(password);
      if (!isPasswordCorrect) {
        throw new customError.UnauthenticatedError('Invalid Credentials');
      }
      const tokenUser = createTokenUser(user);
      attachCookiesToResponse({ res, user: tokenUser });
    
      res.status(StatusCodes.OK).json({ user: tokenUser });
}

const logout = async(req,res) => {
    res.send('login user')
};

module.exports = {register, login, logout}