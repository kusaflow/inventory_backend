/**
 * Middleware to check Token and admin.
 * @returns Middleware functions admin and validateToken.
 */

const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validateToken = asyncHandler(async (req, res, next) => {
    //res.status(401).json({error : 'Invalid token, authorization denied'});  
    let authHeader = req.headers.Authorization || req.headers.authorization;

    if (!authHeader && !authHeader.startsWith('Bearer')) {
        res.status(401).json({error : 'Invalid token, authorization denied'});
        throw new Error('Invalid token, authorization denied');
    }

    const token = authHeader.split(' ')[1];
    
    if (!token) {
        res.status(401).json({error : 'No token, authorization denied'});
        throw new Error('No token, authorization denied');
    }
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        //console.log(decoded.user)
        //res.status(200).json({userw : decoded.user});
        req.user = decoded.user; 
        next();
    } catch (error) {
        res.status(401).json({error : 'Invalid token, authorization denied'});
        throw new Error('Invalid token');
    }
}
);

const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
};

module.exports = {admin, validateToken};