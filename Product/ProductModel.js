const { default: mongoose } = require("mongoose");
// let reletetProduct = new mongoose.Schema({
//     _id: {
//         type: String,
//         required: true
//     },
//     color: {
//         type: String,
//         required: true
//     },
//     file: {
//         type: String,
//         required: true
//     },
//     size: {
//         type: String,
//         required: true

//     },
//     price: {
//         type: Number,
//         required: true
//     },
//     title: {
//         type: String,
//         required: true
//     }
// })
const ProuctSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
  
    Sku: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    color: {
        type: [String], // Array of strings
        required: true
    },
    size: {
        type: [String], // Array of strings
        required: true
    },
    orignalPrice: {
        type:Number,
        required: true

   },
    price: {
        type:Number,
        required: true

   },
   Variant: [
    {
      color: String,
      size: String,
      file: String,
      sku: String,
      price:Number
    }
  ],
    Image: {
        type: String,
        required: true
    }


}, { timestamps: true })


const ProductModel = mongoose.model("products", ProuctSchema)

module.exports = ProductModel