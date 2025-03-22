const ProductModel = require("./ProductModel");
const cloudinary = require("cloudinary")
const fs = require("fs");
const userModel = require("../User/UserModel");
const path = require("path");

cloudinary.config({
    cloud_name: 'dmwiolmq1',
    api_key: '499763469746743',
    api_secret: 'v3mdjJGmy1ls2bu_-A-ebH7zopE'
})

const ProductController = {
     CreateProduct : async (req, res) => {
        try {
            let { name, Sku, Description, color, size, Variant, price, orignalPrice, user } = req.body;
            console.log("Request Body:", req.body);
    
            if (!name || !Sku || !Description || !color || !size || !Variant || !price || !orignalPrice || !user) {
                return res.status(400).json({ message: "Missing required fields" });
            }
    
            if (!req.file) {
                return res.status(400).json({ message: "Image not uploaded" });
            }
    
            const imgPath = req.file.path;
            console.log("Uploaded Image Path:", imgPath);
    
            if (!fs.existsSync(imgPath)) {
                return res.status(400).json({ message: "File does not exist" });
            }
    
            // ✅ Upload image to Cloudinary
            const result = await cloudinary.uploader.upload(imgPath);
            console.log("Cloudinary URL:", result.url);
    
            // ✅ Delete local file after uploading
            fs.unlinkSync(imgPath);
    
            let colors = color.split(",");
            let sizes = size.split(",");
    
            const product = new ProductModel({
                name,
                price,
                orignalPrice,
                Sku,
                Description,
                color: colors,
                size: sizes,
                Variant: JSON.parse(Variant),
                Image: result.url,
                user
            });
    
            await product.save();
            console.log("Product Created:", product);
    
            res.status(201).json({ message: "Product created successfully", product });
    
        } catch (error) {
            console.error("Error in CreateProduct:", error);
            res.status(500).json({ message: "Something went wrong", error: error.message });
        }
    },
    
    ListProduct: async (req, res) => {
        try {

            const result = await ProductModel.find()
            if (!result) return res.status(500).send({ message: "Somthis went Wrong" })
            return res.status(200).send({ message: "successfully", data: result })
        } catch (error) {
            console.log(error);
        }
    },
    DeleteProduct: async (req, res) => {
        try {
            const { id } = req.params
            const result = await ProductModel.findByIdAndDelete({ _id: id })
            if (!result) return res.status(500).send({ message: "somthing went wrong" })
            return res.status(200).send({ message: "successfully", })
        } catch (error) {
            console.log(error);
        }
    },
    GetproductById: async (req, res) => {
        try {
            const { id } = req.params
            const result = await ProductModel.findById({ _id: id })
            if (!result) return res.status(404).send({ message: " Somthing went wrong" })
            return res.status(200).send({ message: "successfully", result })
        } catch (error) {
            console.log(error);
        }
    },

}

module.exports = ProductController