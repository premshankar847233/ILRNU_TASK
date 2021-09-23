const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncErrors');


//register a user  =>/api/v1/register

exports.registerUser = catchAsyncError(async (req,res,next)=>{
    const {name,email,password} = req.body;

    const user = await User.create({
        name,
        email,
        password
    })
    if(user)
    {
        res.send({
            status:true,
            user,
            message:"user saved successfully"
        })
    }

    else
    {
        res.send({
            status:false,
            message: "some errror occured"
        })
    }
    
})


//Login User  => api/v1/login
exports.loginUser = catchAsyncError(async(req,res,next) =>{
    const {email,password} = req.body;

    //check if email and password is entered by user
    if(!email || !password)
    {
        return next(new ErrorHandler('Please enter email & password',400));
    }

    //finding user in database

    const user = await User.findOne({email}).select('-createdAt +password');

    if(!user)
    {
        return next(new ErrorHandler('Invalid Login Credentials',401));
    }

    //check if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched)
    {
        return next(new ErrorHandler('Invalid Login Credentials',401));
    }
   sendToken(user,200,res);
})

//Admin routes

//Get All Users => /api/v1/admin/users

exports.allUsers = catchAsyncError(async (req,res,next)=>{

    const users = await User.find()

    res.status(200).json({
        success: true,
        users
    })
})

//get user details  => /api/v1/admin/user/:id

exports.getUserDetails = catchAsyncError(async (req,res,next)=>{

    const user = await User.findById(req.params.id)

    if(!user)
    {
        return next(new ErrorHandler(`User does not exists with this particular id :${req.params.id}`))
    }

    res.status(200).json({
        success:true,
        user
    })
})

//update user details  => /api/v1/admin/user/:id

exports.updateUser = catchAsyncError(async (req,res,next)=>{
    const newUserData = {
        name: req.body.name,
        email:req.body.email,
        role:req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify: false
    })

    res.status(200).json({
        success:true,
        user
    })
})

//delete user => /api/v1/admin/user/:id

exports.deleteUser = catchAsyncError(async (req,res,next)=>{

    const user = await User.findById(req.params.id)

    if(!user)
    {
        return next(new ErrorHandler(`user does not exist with this id: ${req.params.id}`,400))
    }
    //remove avatar from cloudinary - todo
    await user.remove();
    res.status(200).json({
        success: true,
    })
})