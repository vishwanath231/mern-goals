import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';


const protect = asyncHandler(async (req, res, next) => {
 
    let token;
        
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        
        try {
            
            // get token from header
            token = req.headers.authorization.split(' ')[1];

            // verfiy token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // get user from token
            req.user = await User.findById(decoded.id).select('-password');

            next();

        } catch (err) {
            res.status(401)
            throw new Error("Not authorized");
        }
    }else{
        res.status(401)
        throw new Error("Not authorized, no token");
    }
});


export default protect;
