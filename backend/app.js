const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const errorMiddleware = require('./middlewares/errors')
app.use(express.json())


//import routes

const auth = require('./routes/auth')
app.use('/api/v1',auth);
module.exports = app;