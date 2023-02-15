const jwt = require('jsonwebtoken');
const config = require('config');

const JWT_KEY = config.get('JWT_KEY');

const generateAuthToken = (user) => {
    const { _id, isBusiness, isAdmin } = user;

    const token = jwt.sign({ _id, isBusiness, isAdmin }, JWT_KEY);

    return token;
}

const verifyAuthToken = (token) => {
    try {
        const userData = jwt.verify(token, JWT_KEY);
        return userData;
    } catch (error) {
        return null;
    }
}

module.exports = { verifyAuthToken, generateAuthToken };