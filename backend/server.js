const app = require('./app');
const connectDatabase = require('./config/database')
const dotenv = require('dotenv')

//setting up the cnfiguration files

dotenv.config({path:'backend/config/config.env'})

//connecting with database at the server starting time

connectDatabase();

//settuping the server

const server = app.listen(process.env.PORT,()=>{

    console.log(`Server Started at port : ${process.env.PORT}`);
});

