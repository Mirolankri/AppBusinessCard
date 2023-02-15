const { verifyAuthToken, generateAuthToken } = require('./providers/jwt');
const { handleError } = require('../utils/errorHandler');
const config = require('config');

const tokenGenerator = config.get('TOKEN_GENERATOR');

const auth = (req, res, next) => {
    if(tokenGenerator === 'jwt'){
        try {
            const tokenFromClient = req.headers['x-auth-token'];
            if(!tokenFromClient) throw new Error('Authentication Error : Please login.');
    
            const userInfo = verifyAuthToken(tokenFromClient);
            if(!userInfo) throw new Error('Authentication Error : Unauthorized user.');

            req.user = userInfo;
            return next();
        } catch (error) {
            handleError(res, 401, error.message)
        }
    }

    return handleError(res, 500, 'You not use JWT');
}

module.exports = auth;