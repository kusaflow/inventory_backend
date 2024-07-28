const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/generateToken")

//@dec register user
//routes post /api/users
//access public
const register = asyncHandler(async (req, res) => {
    const {username, email, password, isAdmin, Code} = req.body;
    //res.status(555).json(req.body);
    if(!username || !email || !password){
        res.status(400).json({msg:"Please fill all the fields 123"});
        throw new Error("Please fill all the fields");
    }

    var strCode = Code.toString();

    if (isAdmin === true){
        if (!Code){
            res.status(400).json({msg:"Wrong Code"});
            throw new Error("Please fill all the fields");
        } else {
            if (strCode !== process.env.AdminConfigCode && 
                strCode !== process.env.SuperAdminConfigCode){
                res.status(400).json({msg : "Invalid Code"});
                throw new Error("Invalid Code");            
            }
        } 
    }

    //already a user check
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400).json({msg : "User already exists"});
        throw new Error("User already exists");
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    let loginMember = "customer";
    if (isAdmin === true){
        if (strCode === process.env.AdminConfigCode)
            loginMember = 'Propertyadmin';
        if(strCode === process.env.SuperAdminConfigCode)
            loginMember = 'superadmin';
    }

    const newuser = await User.create({
        username,
        email,
        password : hashedPassword,
        role: loginMember
    });

    const _token = generateToken(
        {
            _id: newuser._id,
            username : newuser.username,
            email : newuser.email,
            role : newuser.role
        }
    );

    var resData = {
        _id: newuser._id,
        username: newuser.username,
        email: newuser.email,
        role : newuser.role,
        token : _token  
    }

    if(newuser){
        res.status(201).json(resData);
    }else{
        res.status(400);
        throw new Error("Invalid user data");
    }
});


//@dec login user
//routes post /api/users
//access public
const login = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        //throw new Error("Please fill all the fields");
    }
    //if user exists
    const user = await User.findOne({email});
    if(!user){
        res.status(401).json({msg : "Invalid credentials"});
        throw new Error("Invalid credentials");
    }

    if(await bcrypt.compare(password, user.password)){
        const _token = generateToken(
            {
                _id: user._id,
                username : user.username,
                email : user.email,
                role : user.role
            }
        );
        // jwt.sign({ id }, process.env.JWT_SECRET, {
        //     expiresIn: '1d',
        // });
        
        res.status(200).json({
            "token" : _token
        });

    }else{
        res.status(401);
        throw new Error("Invalid credentials");
    }

});


//@dec current user
//routes get /api/users/current
//access private
const current = asyncHandler(async (req, res) => {
    res.status(200).json({user : req.user}); 
});


//@dec all user
//routes get /api/users/all
//access private
const allUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.status(200).json(users);
});

const userById = asyncHandler(async (req, res) => {
    const users = await User.find({username: req.id});
    res.status(200).json(users);
});


// Update user role
//routes get /api/users/role
//access private
const updateUserRole = asyncHandler(async (req, res) => {
    const { userId, role } = req.body;
    const user = await User.findById(userId);

    if (user) {
        user.role = role;
        await user.save();
        res.status(200).json({ message: 'User role updated successfully' });
    } else {
        res.status(404).json({ message: 'User not found' });
        throw new Error('User not found');
    }
});

// Update user password
//routes get /api/users/password
//access private
const updateUserPassword = asyncHandler(async (req, res) => {
    const { userId, newPassword } = req.body;
    const user = await User.findById(userId);

    if (user) {
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        res.status(200).json({ message: 'User password updated successfully' });
    } else {
        res.status(404).json({ message: 'User not found' });
        throw new Error('User not found');
    }
});


module.exports = {register, login, current, allUsers, userById, updateUserRole, updateUserPassword };

