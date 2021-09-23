const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:[true,'Please Enter Your Name'],
        maxLength:[30,'Your Name Can not Exceeds 30 character']
    },
    email:{
        type:String,
        required:[true,'Please enter your email'],
        unique:true,
        validate:[validator.isEmail,'Please Enter a Valid Email for Registration']
    },
    password:{
        type:String,
        required:[true,'Please Enter Your Password'],
        minLength:[6,'Please select a Password with minimum 6 character'],
        select:false
    }
})

//encrypting password before saving user

userSchema.pre('save',async function(next){

    this.password = await bcrypt.hash(this.password,10);
})

//return JWT token
userSchema.methods.getJwtToken = function(){

    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_TIME
    });
}

//compare user password

userSchema.methods.comparePassword = async function(enteredPassword){

    return bcrypt.compare(enteredPassword,this.password);
}

//Generate password reset token
module.exports = mongoose.model('User',userSchema);