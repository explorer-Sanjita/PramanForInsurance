const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
require('dotenv').config();
const catchAsync = require('../middleware/catchAsync')
const ErrorHandler = require("../utils/errorHandler");
const Claim = require("../models/claim");
exports.register =  catchAsync(async  (req, res,next) => {
    // Hash password
    const { email, password, metamask,name} = req.body
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User(req.body);
    const checkUser = await User.findOne({
        $or: [{ email }, { metamask }]
    });
    if (checkUser) {
        if (checkUser.metamask === metamask) {
            return next(new ErrorHandler("Metamask already exists", 401));
        }
        return next(new ErrorHandler("Email already exists", 401));
    }
    user.password = hashedPassword;
    try {
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    } catch (err) {
        console.log(err.message)
        res.status(401).json({ error: err.message });
    }
});

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Entered')
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        // Compare password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Generate a JSON Web Token (JWT)
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h', // Set token expiration time
        });
        res.json({ user,token });
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Server error' });
    }
}
exports.getAllInsuranceFirmUsers = async (req, res, next) => {
    try {
        const users = await User.find({role : 'insuranceFirm'});

        res.status(200).json({
            success: true,
            users: users,
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.profile = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Customize the response based on your frontend's needs
        res.json({
            userId: user._id,
            name: user.name,
            email: user.email,
            // ... other relevant user information
        });
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
}
exports.update = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.userId, req.body, {
            new: true, // Return the updated user object
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Failed to update profile' });
    }
};
exports.getUserDetailsById = async (req,res) =>{
    try {
        const userDetail = await User.findById(req.query.userId);
        res.json(userDetail);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}