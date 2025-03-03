require('dotenv').config()
const connectDB = require('./config/dbConn.config.js')
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const path = require('path')
const { logger, logEvents } = require('./middleware/logger.middleware')
const errorHandler = require('./middleware/errorHandler.middleware')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOption.config.js')

const PORT = process.env.PORT || '4000'

connectDB()

app.use(logger)

app.use(cors(corsOptions))

app.use(express.json())

app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, '/public')))

app.use('/', require('./routes/root.route.js'));

app.use('/user', require('./routes/user.route.js'))

app.use('*', (req,res)=>{
    res.status(404)
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if(req.accepts('json')){
        res.json({'message': "404 not found"});
    }else{
        res.type('txt').send('404 not found');
    }
});

app.use(errorHandler);

mongoose.connection.once('open', ()=>{
    console.log('Connected to MongoDB');
    app.listen(PORT, ()=>{
        console.log(`server is running on PORT ${PORT}`)
    });
})

mongoose.connection.on('error', err=>{
    console.log(err);
    logEvents(`${err.no}\t${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})