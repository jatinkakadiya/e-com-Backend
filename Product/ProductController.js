const ProductModel = require("./ProductModel");
const cloudinary = require("cloudinary")
const fs = require("fs");
const userModel = require("../User/UserModel");
cloudinary.config({
    cloud_name: 'dmwiolmq1',
    api_key: '499763469746743',
    api_secret: 'v3mdjJGmy1ls2bu_-A-ebH7zopE'
})

const ProductController = {
    CreateProduct: async (req, res) => {
        try {


            let { name, Sku, Description, color, size, Variant, price, orignalPrice, user } = req.body
            if (!name || !Sku || !Description || !color || !size || !Variant || !price || !orignalPrice || !user) return res.status(404).send({ message: "missing dependecy" })
            const img = req.file.path
            console.log(img);
            if (!img) return res.status(404).send({ message: "img is not uplode" })

            if (typeof Variant === "string") {
                Variant = JSON.parse(Variant);
            }

            // Ensure Variant is an array
            if (!Array.isArray(Variant)) {
                return res.status(400).json({ error: "Variant must be an array" });
            }
            const reuslts = await cloudinary.uploader.upload(img)
            await fs.unlinkSync(img)

            // const result = await ProductModel.create({ ...req.body, Image: reuslts.url, Variant: Variant })
            // console.log(result);
            // if (!result) return res.status(500).send({ message: "Somthis went Wrong" })
            // return res.status(200).send({ message: "successfully" })
            let colors = color.split(',')
            let sizes = size.split(',')
            const User = await userModel.findOne({ _id: user })
            if(User.Role === "admin"){
                const product = new ProductModel({
                    name,
                    price,
                    orignalPrice,
                    Sku,
                    Description,
                    color: colors,
                    size: sizes,
                    Variant,
                    Image: reuslts.url  // Now correctly formatted
                });
                await product.save();
                console.log("create");
                res.status(201).json({ message: "Product created successfully", product });
            }else{
                return res.status(401).send({message:"unothrese user"})
            }

        } catch (error) {
            console.log(error);
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