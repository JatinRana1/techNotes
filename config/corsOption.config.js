const allowedOrigins = require('./allowedOrigins.config')

let corsOptions = {
    origin: function (origin, callback) {
        if(allowedOrigins.indexOf(origin) !== -1 || !origin){
            callback(null, true);
        }else{
            callback(new Error ('Not allowed by CORS.'))
        }
    }
}

module.exports = corsOptions;