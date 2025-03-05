const { default: mongose, default: mongoose } = require("mongoose")
const orderSchema = new mongoose.Schema({

    user: {
        type:mongoose.Types.ObjectId,
        ref:"users"
    },
    prodcut: {
        type: Array,
        required: true
    },
    totlePrice: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    paymentStatus: { type: String, default: "pending" },
    deliveryStatus: { type: String, default: "pending" },
    address: { type: mongoose.Types.ObjectId, required: true, ref: "addresses" },
    totalDiscount: { type: Number, default: 0 },

})

const orderModel = mongoose.model("orders", orderSchema)

module.exports = orderModel