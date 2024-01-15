import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateTokens.js';
import User from '../models/userModels.js';

//@desc Auth user/set token
//route POST /api/users/auth
//@access public
const authUser = asyncHandler(async (req, res) => {
    //custom error creation for check
    // res.status(401);
    // throw new Error('something went wrong');
    res.status(200).json({ message: 'Auth Server' });
});

//@desc Register a new User
//route POST /api/users
//@access public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User Already exists');
    }

    const user = await User.create({
        name,
        email,
        password
    });

    if (user) {
        generateToken(res, user._id);
        res.status(201).json({
            _id: user._id, 
            name: user.name,
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
    res.status(200).json({ message: 'LogOut User' });
});

//@desc Get user profile
//route GET /api/users/profile
//@access private
const getUserProfile = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'User Profile' });
});

//@desc Update user profile
//route PUT /api/users/profile
//@access private
const updateUserProfile = asyncHandler(async (req, res) => {
    res.status(200).json({ message: 'Update User Profile' });
});

export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
};