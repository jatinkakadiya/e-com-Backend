const  {default:mongoose}  = require("mongoose")

 const couponSchema = new mongoose.Schema({
     name:{
        type:String,
        required:true
     },
     discount:{
        type:Number,
        required:true

     }
 })

 const couponModel =  mongoose.model("coupon",couponSchema)

 module.exports = couponModel