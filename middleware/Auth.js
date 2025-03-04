const jwt = require("jsonwebtoken");
const userModel = require("../User/UserModel"); // Import User model
require("dotenv").config();

const Auth = async (req, res, next) => {
    try {
        // Get token from cookies
        const token = req.cookies.token;
    
        if (!token) {
            return res.status(401).json({ message: "Access Denied! No token provided." });
        }

        // Verify JWT token
        const decoded = jwt.verify(token, process.env.jwt_secrate);
        if (!decoded) {
            return res.status(401).json({ message: "Invalid token. Authentication failed!" });
        }

        // Find user in the database (excluding password)
        const user = await userModel.findById(decoded._id).select("-Password");
        if (!user) {
            return res.status(401).json({ message: "User not found!" });
        }

        // Attach user data to request
        req.user = user;
        next(); // Move to the next middleware or controller
    } catch (error) {
        console.error("Auth Middleware Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
const RoleAuth = async(req,res,next)=>{
    try {
        // Get token from cookies
        const token = req.cookies.token;
       
        if (!token) {
            return res.status(401).json({ message: "Access Denied! No token provided." });
        }

        // Verify JWT token
        const decoded = jwt.verify(token, process.env.jwt_secrate);
        if (!decoded) {
            return res.status(401).json({ message: "Invalid token. Authentication failed!" });
        }

        // Find user in the database (excluding password)
        const user = await userModel.findById(decoded._id).select("-Password");
        if (!user) {
            return res.status(401).json({ message: "User not found!" });
        }

        // Attach user data to request
        if(user.Role==="admin"){
            next()
        }else{
            return res.status(401).json({ message: "Invalid token. Authentication failed!" +"" });

        }
        req.user = user;
    } catch (error) {
        console.error("Auth Middleware Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = {Auth,RoleAuth};
