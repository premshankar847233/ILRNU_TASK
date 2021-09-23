const ErrorHandler = require('../utils/errorHandler');

module.exports = (err,req,res,next) =>{

    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';

    
        return res.status(err.statusCode).json({
            success:false,
            errorMessage: err.message,
            Error: err,
            stack:err.stack
        })
    
}