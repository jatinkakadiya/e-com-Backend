const { default: mongoose } = require("mongoose");
// require("dotenv").config()

async function ConnectDb(){
    try {
        await mongoose.connect("mongodb+srv://jatinkakadiya234:iqD6w9vBN1nOQuw5@cluster0.pmp8n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        console.log("Db Conneted")
    } catch (error) {
        console.log("Db Connection Loss")
    }
}


module.exports = ConnectDb