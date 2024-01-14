import asyncHandler from 'express-async-handler';

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
    res.status(200).json({ message: 'Register User' }); 
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