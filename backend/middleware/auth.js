const jsonWebToken = require('jsonwebtoken');
const {jwt} = require('../util/data');
exports.auth = (req, res, next) => {
    if(req.method === "OPTIONS"){
        return next();
    }
    let token;
    try {
        token = req.headers.authorization.split(' ')[1]; //Authorization bearer token
        if (!token) {
            console.log('error from auth')
        }
        const decodedToken= jsonWebToken.verify(token, jwt);
        req.userData = { userId: decodedToken.userId };
        next();
    }
    catch (err) {
        console.log("error from auth")
    }

}