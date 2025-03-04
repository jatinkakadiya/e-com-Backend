const { default: mongoose } = require("mongoose")

const variantSchema = new mongoose.Schema({
    color:[],
    Size:[]

})

const variant = mongoose.model("variant",variantSchema)

module.exports = variant