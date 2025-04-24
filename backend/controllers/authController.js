const User = require("../models/user");
const { hashSync, compareSync} = require("bcrypt");
require("../config/passport.js");
const jwt = require("jsonwebtoken");

module.exports.register = async (req, res)=>{
    try{
   const {name, email, password, role} = req.body;
   const existingUser = await User.findOne({ email });
   if(existingUser) {
    return res.status(400).json({
        success: false,
        message: "user already exists with this email"
    });
   }

   const user = new User({
    name,
    email,
    password: hashSync(password,10),
    role
   });

   const savedUser = await user.save();

   res.status(201).json({
    success: true,
    message: "User created successfully",
    user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        role: savedUser.role
    }
   });
    }catch(err) {
        console.log("Error during registration:", err);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
}

module.exports.login = async (req, res) => {
    try{
        //No user found
       const user = await User.findOne({email : req.body.email});
       if(!user){
        return res.status(401).send({
            success: false,
            messagge: "no  user found with this email id",
        })
       }
     //Incorrect password
     if(!compareSync(req.body.password,user.password)){
          return res.status(401).send({
            success: false,
            message: "Incorrect password"
          })
     }
     const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role
     }
     const token = jwt.sign(payload,"Random String", {expiresIn: "1d"});

     return res.status(200).json({
        success : true,
        message : "Logged In successfully",
        token : "Bearer " + token 
     })
    }catch(err) {
        console.log("Error during login:", err);
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
}