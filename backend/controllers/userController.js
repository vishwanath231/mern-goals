import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';
import Users from '../models/userModel.js';



const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password, password2 } = req.body;


    if (!name || !email || !password || !password2){
        res.status(400) 
        throw Error("please add all fields");
    }
    
    if (password !== password2){
        res.status(400) 
        throw new Error("Password doesn't match");
    }
    

    const user = await User.findOne({ email });
    if (user) {
        res.status(400)
        throw new Error("Email already exists");
    }

    const salt = await bcrypt.genSalt(10);
    if (!salt) {
        res.status(400)
        throw new Error("something went wrong with bcrypt"); 
    }

    const hashPassword = await bcrypt.hash(password, salt);
    if (!hashPassword) {
        res.status(400)
        throw new Error("something went wrong with hashing password");
    }

    const userData = new User({
        name,
        email,
        password: hashPassword
    })

    const savedUser = await userData.save(); 

    if (savedUser) {
        
        res.status(201).json({ 
            msg: "Register successfull!",
            success:  true,
            token: generateToken(savedUser._id),
            user: {
                id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email
            }
        })
    }
});



const loginUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400)
        throw new Error("Please add all fileds");
    }

    const user = await User.findOne({ email: email });

    if (!user) {
        res.status(400)
        throw new Error("Email invalid");
    }


    const isCheck = await bcrypt.compare(password, user.password)
    if (!isCheck) {
        res.status(400)
        throw new Error("Invalid credentials")
    }

    res.status(200).json({
        msg: "Login successfull!",
        success: true,
        token: generateToken(user._id),
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        }
    })
})


const getUser = asyncHandler(async (req, res) => {

    const { _id, name, email } = await User.findById(req.user.id);

    res.status(200).json({
        id: _id,
        name,
        email
    })

});



export {
    registerUser,
    loginUser,
    getUser
}