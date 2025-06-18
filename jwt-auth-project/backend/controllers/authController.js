const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const generateToken = require('../utils/generateToken')
const asyncHandler = require('express-async-handler')

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        if(!name || !email || !password) {
            return res.status(400).json({ message: "Please fill all fields" })
        }

        const existingUser = await User.findOne({ email })

        if(existingUser) {
            return res.status(400).json({ message: "User already exists for this email address" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        })

        await newUser.save()

        const token = generateToken(newUser._id)

        res.status(201).json({
            message: "User registered successfully",
            token,
            user: {
                id: newUser._id,
                name: newUser._name,
                email: newUser._email
            }
        })

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message})
    }
}

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if(!email || !password) {
        return res.status(400).json({ message: "Please provide email and password" })
    }

        const user = await User.findOne({ email })
        if(!user) {
            return res.status(401).json({ message: "Invalid credentials" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" })
        }

        const token = generateToken(user._id)
        res.status(200).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })
    
})


const getUserProfile = asyncHandler(async (req, res) => {
    if(!req.user) {
        return res.status(401).json({ message: "Not authorised" })
    }

    res.status(200).json({
        id: req.user._id,
        name: req.user.name,
        email: req.user.email
    })
})


const updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)

        if(!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if(req.body.password) {
            user.password = req.body.password
        } 

        const updatedUser = await user.save()

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            message: "Profile updated successfully"
        })
    } catch(error) {
        console.error("Profile update error", error)
        res.status(500).json({ message: 'Server error during profile update' })
    }
}

const deleteUserProfile = asyncHandler(async (req ,res)=>{
    const user = await User.findById(req.user._id)

    if(user) {
        await user.deleteOne()

        res.status(200).json({ message: 'User account deleted successfully' })
    } else {
        res.status(404).json({ message: "User not found" })
    }
})

module.exports = { registerUser, loginUser, getUserProfile, updateUserProfile, deleteUserProfile }



