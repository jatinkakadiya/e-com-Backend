 const {default:mongoose} = require("mongoose")

const  AddressSchema = new mongoose.Schema({
    FristName:{
        type:String,
        required:true
    },
    LastName:{
        type:String,
        required:true
    },
    Phone:{
        type:Number,
        required:true,
        length:10
    },
    City:{
        type:String,
        required:true
    },
    State:{
        type:String,
        required:true
    },
    Pincode:{
        type:Number,
        required:true,
        length:6
    },
    AddressName:{
        type:String,
        required:true
    },
})

const addressModel =  mongoose.model("addresses",AddressSchema)

module.exports = addressModel