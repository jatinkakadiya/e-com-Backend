const { default: mongoose } = require("mongoose");
// require("dotenv").config()

async function ConnectDb(){
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/product")
        console.log("Db Conneted")
    } catch (error) {
        console.log("Db Connection Loss")
    }
}


module.exports = ConnectDb