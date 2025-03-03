const User = require('../models/user.model')
const Note = require('../models/note.model')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

// @desc Get all users
// @route Get /user
// @access Private
const getAllUsers = asyncHandler( async (req,res)=>{
    let users = await User.find().select('-password').lean()
    if(!users) return res.status(400).json({message: 'No users found'})
    res.json(users)
})

// @desc Create new users
// @route POST /user
// @access Private
const createNewUser = asyncHandler( async (req,res)=>{
    const { username, password, roles} = req.body 

    //confirm data
    if(!username || !password || !Array.isArray(roles) || roles.length < 0) {
        return res.status(400).json({message: 'All Fields are Required'}) 
    }

    //check for duplicate
    const duplicate = await User.findOne(username).lean().exec()
    if(duplicate) {
       return res.status(409).json({message: 'Duplicate User'})
    }

    //hash password
    const hashPwd = await bcrypt.hash(password, 10)

    //user object
    const userObj = {username, hashPwd, role}

    //create user
    const user = await User.create(userObj)
    if(user) {
        res.status(201).json({message: `New User Created: ${username}`})
    }else {
        res.status(400).json({message: 'Invalid user Object'})
    }

})

// @desc Update user
// @route PATCH /user
// @access Private
const updateUser = asyncHandler( async (req,res)=>{
    
})

// @desc Delete user
// @route DELETE /user
// @access Private
const deleteUser = asyncHandler( async (req,res)=>{
    
})

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}