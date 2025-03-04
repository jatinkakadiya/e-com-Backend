const { default: mongoose } = require("mongoose")


const imgSchema = new mongoose.Schema({
    img:{
        type:String,
        required:true
    }
},{timestamps:true})


let imgModel =  mongoose.model("images",imgSchema)

module.exports = imgModel