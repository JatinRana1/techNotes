const express = require('express')
const app = express()
const PORT = process.env.PORT || '4000'
const path = require('path')
const { logger } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOption')

app.use(logger)

app.use(cors(corsOptions))

app.use(express.json())

app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, '/public')))

app.use('/', require('./routes/root'));

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

app.listen(PORT, ()=>{
    console.log(`server is running on PORT ${PORT}`)
});