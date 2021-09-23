//create and send token and sasve in the cookie
const sendToken = (user,statusCode,res) =>{

    //create Jwt token
    const token = user.getJwtToken();

    res.status(statusCode).cookie('token',token,options).json({
        status : true,
        token,
        user
    })
}

module.exports = sendToken;