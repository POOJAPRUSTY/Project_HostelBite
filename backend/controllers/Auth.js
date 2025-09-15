const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
require("dotenv").config();

exports.signup = async (req, res) => {
    try {
        const { name, email, password, confirmPassword, role } = req.body;

        // validation

        if(!name || !email || !password || !confirmPassword || !role){
            return res.status(400).json({
                success:false,
                message:"all details are required"
            })

        }

        if(password !== confirmPassword){
            return res.status(402).json({
                success:false,
                message:"password didn't match"
            })
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "user already exists"
            })
        }

        // hash password

        let hashedPassword;
        try {
            // hashing password upto 10 rounds
            hashedPassword = await bcrypt.hash(password, 10);

        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: "error in hashing password"
            })

        }

        // entry

        const user = await User.create({
            name, email, password: hashedPassword, role
        });

        return res.status(200).json({
            success: true,
            message: "user created successfully"
        });


    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "user cannot be registered,please try again later"
        });

    }

}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // check user entered email and password
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "please fill all the details carefully"
            })
        }

        // check user is registered
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "user is not registered"
            });

        }

        // create a payload
        const payload = {
            email: user.email,
            id: user._id,
            role: user.role
        };

        // match passwords and create jwt token
        if (await bcrypt.compare(password, user.password)) {
            // successfully logged in---> create token

            // sign method is used to create token it takes three parameters
            //  payload,secret key and when will it expires

            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" });

            // now I want to add this token to user 
            user.token = token;
            console.log(user);
            // removing password From user not database 
            // why we are removing password ---> because oF security purpose
            user.password = undefined;

            // creating cookie and passing this token to cookie
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            }
            // cookie takes three parameters cookie name , value and options

            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "user logged in successfully"
            });


        } else {
            // password not matched
            return res.status(403).json({
                success: false,
                message: "password incorrect"
            });
        }


    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "login Failure"
        });

    }
}