const userModel = require("./UserModel");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()
let userController = {
    Register: async (req, res) => {
        try {
            let { Name, Phone, Email, Password } = req.body
            if (!Name || !Phone || !Email || !Password) return res.status(404).send({ message: "missing dependecny" })
            const user = await userModel.findOne({ Email: Email })
            if (user) {
                return res.status(401).send({ message: "user allredy exise" })
            }
            const epassword = bcrypt.hashSync(Password, 8)
            const result = await userModel.create({ ...req.body, Password: epassword })
            if (!result) return res.status(500).send({ message: "somthing went wrong" })
            return res.status(200).send({ message: "sucssece" })
        } catch (error) {
            console.log(error);
        }
    },
    Login: async (req, res) => {
        try {
            const { Email, Password } = req.body;

            // Check if user exists
            const user = await userModel.findOne({ Email });
            if (!user) return res.status(401).json({ message: "User not registered" });

            // Compare password
            const isMatch = bcrypt.compareSync(Password, user.Password);
            if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

            // Create JWT token
            const payload = { _id: user._id, Email: user.Email, Role: user.Role, Name: user.Name };
            const token = jwt.sign(payload, process.env.jwt_secrate, { expiresIn: "3d" });

            // Set token in cookies
            res.cookie('token', token, {
                httpOnly: true,  // Token is not accessible via JavaScript
                secure: 'production',  // Secure cookies in production
                maxAge: 3600000,  // 1 hour expiration
            });

            res.send({ message: 'Logged in successfully', token });


        } catch (error) {
            console.error("Login Error:", error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
}


module.exports = userController