const { logEvents } = require('./logger.middleware')

const errorHandler = (err,req,res,next) => {
    console.log('error handler run');
    logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errorLog.log')
    console.log(err.stack);
    const status = res.statusCode ? res.statusCode : 500 // Internal Server Error
    res.status(status);
    res.json({message: err.message})
    next();
}

module.exports = errorHandler;