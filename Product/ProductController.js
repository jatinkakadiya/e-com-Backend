const ProductModel = require("./ProductModel");
const cloudinary = require("cloudinary");
const fs = require("fs");

// Configure Cloudinary
cloudinary.config({
    cloud_name: 'dmwiolmq1',
    api_key: '499763469746743',
    api_secret: 'v3mdjJGmy1ls2bu_-A-ebH7zopE'
});

const ProductController = {
    // Create a new product
    CreateProduct: async (req, res) => {
        try {
            console.log("Uploaded File:", req.file); // Log uploaded file details
            if (!req.file) {
                return res.status(400).json({ message: "Image not uploaded" });
            }

            const imgPath = req.file.path; // Get the file path
            console.log("Image Path:", imgPath);

            // Check if the file exists
            if (!fs.existsSync(imgPath)) {
                return res.status(400).json({ message: "File does not exist" });
            }

            // Upload the image to Cloudinary
            const result = await cloudinary.uploader.upload(imgPath);
            console.log("Cloudinary URL:", result.url);

            // Delete the local file after upload
            fs.unlinkSync(imgPath);

            // Parse request body
            const { name, Sku, Description, color, size, Variant, price, orignalPrice, user } = req.body;

            // Create a new product
            const product = new ProductModel({
                name,
                price,
                orignalPrice,
                Sku,
                Description,
                color: color.split(","), // Convert color string to array
                size: size.split(","), // Convert size string to array
                Variant: JSON.parse(Variant), // Parse Variant JSON string
                Image: result.url, // Save Cloudinary URL
                
            });

            // Save the product to the database
            await product.save();
            res.status(201).json({ message: "Product created successfully", product });
        } catch (error) {
            console.error("Error in CreateProduct:", error);
            res.status(500).json({ message: "Something went wrong", error: error.message });
        }
    },

    // List all products
    ListProduct: async (req, res) => {
        try {
            const result = await ProductModel.find();
            if (!result) {
                return res.status(500).send({ message: "Something went wrong" });
            }
            return res.status(200).send({ message: "Successfully fetched products", data: result });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Something went wrong", error: error.message });
        }
    },

    // Delete a product by ID
    DeleteProduct: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await ProductModel.findByIdAndDelete({ _id: id });
            if (!result) {
                return res.status(500).send({ message: "Something went wrong" });
            }
            return res.status(200).send({ message: "Product deleted successfully" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Something went wrong", error: error.message });
        }
    },

    // Get a product by ID
    GetproductById: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await ProductModel.findById({ _id: id });
            if (!result) {
                return res.status(404).send({ message: "Product not found" });
            }
            return res.status(200).send({ message: "Successfully fetched product", result });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Something went wrong", error: error.message });
        }
    },
    UpdateProduct:async(req,res)=>{
        try {
            let  {id} = req.params
            let result = await ProductModel.findByIdAndUpdate({_id:id},{...req.body})
            if (!result) return res.status(500).send({ message: "somthing went wrong" })
                return res.status(200).send({ message: "sucsess" })
        } catch (error) {
            console.log(error);
        }
    }
    
};

module.exports = ProductController;