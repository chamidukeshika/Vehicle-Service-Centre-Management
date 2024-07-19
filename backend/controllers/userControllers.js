import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateTokens.js';
import User from '../models/userModels.js';

//@desc Auth user/set token
//route POST /api/users/auth
//@access public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id, 
            name: user.name,
            email: user.email,
            phone: user.phone
        });
    } else {
        res.status(401);
        throw new Error('Invalid username or password');
    }
});

//@desc Register a new User
//route POST /api/users
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, phone,password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User Already exists');
    }

    const user = await User.create({
        name,
        email,
        phone,
        password
    });

    if (user) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id, 
            name: user.name,
            phone:user.phone,
            email: user.email
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }

});

//@desc LogOut user
//route POST /api/users/logout
//@access public
const logoutUser = asyncHandler(async (req, res) => {

    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({ message: 'User Logged Out' });
});

//@desc Get user profile
//route GET /api/users/profile
//@access private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = {
        _id: req.user._id,
        name: req.user.name,
        phone:req.user.phone,
        email:req.user.email
    }
    res.status(200).json(user);
});

//@desc Update user profile
//route PUT /api/users/profile
//@access private
const updateUserProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.phone = req.body.phone || user.phone;

        if (req.body.password) {
            user.password = req.body.password;
        }
        
        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            phone:updatedUser.phone,
            email:updatedUser.email

        })
    } else {
        res.status(404);
        throw new Error('User Not Found');
    }

    res.status(200).json({ message: 'Update User Profile' });
});

//update User Feedbacks
// const updateFeedback = async (req, res, next) => {

// }

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
};