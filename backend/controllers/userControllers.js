const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../config/generateToken');

const registerUser = asyncHandler(async(req, res) => {
    const {name, email, password, pic} = req.body;

    if(!name || !email || !password){
        res.status(400);
        throw new Error('Please enter all fields');
    }

    const userExists = await User.findOne({email: email});
    if(userExists){
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name: name,
        email: email,
        password: password,
        pic: pic
    });

    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id)
        });
    }else{
        res.status(400);
        throw new Error('Failed to create the new User');
    }
});

const authenticateUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({email: email});
    
    // User with entered email exists and entered password is correct
    if(user && (user.password == password)){
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id)
        })
    }else{
        res.status(401);
        throw new Error('Invalid Email or Password');
    }
});

module.exports = { 
    registerUser,
    authenticateUser
}