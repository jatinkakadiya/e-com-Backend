const { default: mongoose } = require("mongoose");

const CartShcema = new mongoose.Schema({

    user: {
        type:mongoose.Types.ObjectId,
        ref:"users"
    },
    productId: {
        type: mongoose.Types.ObjectId,
        ref: "products",
        required: true
    },
    Qty: {
        type: Number,
        required: true,
        default: 1
    }

}, { timestamps: true })

const CartModel = mongoose.model("cart", CartShcema)
module.exports = CartModel