const { default: mongoose } = require("mongoose");
// require("dotenv").config()

async function ConnectDb() {
    try {
        await mongoose.connect("mongodb+srv://jatinkakadiya234:iqD6w9vBN1nOQuw5@cluster0.pmp8n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Db Connected");
    } catch (error) {
        console.error("Db Connection Error:", error.message);
        setTimeout(ConnectDb, 5000); // 5 સેકન્ડ પછી ફરીથી Retry કરો
    }
}



module.exports = ConnectDb