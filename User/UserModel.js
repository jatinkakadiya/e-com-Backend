const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema({
Name:{
    type:String,
    required:true
},
Phone:{
    type:Number,
    required:true,
    length:10
},
Email:{
    type:String,
    required:true
},
Image:{
    type:String
},
Role:{
    type:String,
    enum :["user","admin"],
    default:"user"
},
Password:{
    type:String,
    required:true
}

}, {
    timestamps: true
})

const userModel = mongoose.model("users",UserSchema)

module.exports = userModel