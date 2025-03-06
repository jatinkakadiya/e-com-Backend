const CartModel = require("./CartModel");
const ProductModel = require("../Product/ProductModel");

const CartController = {
    AddToCart: async (req, res) => {
        try {
            let { productId, Qty,user } = req.body
            if (!productId || !Qty|| !user) return res.status(404).send({ mesage: "Missing dependecy" })
            let result = await CartModel.findOne({ productId: productId,user:user })
            if (result) {
                result = result._doc
                Qty = result.Qty + Qty
                const UPdateProduct = await CartModel.updateOne({ productId: productId ,user: user}, { Qty: Qty })
                if (!UPdateProduct || UPdateProduct.modifiedCount <= 0) return res.status(500).send({ mesaage: "Somthing went wrong" })
                return res.status(200).send({ message: "Success" })
            }
            let create = await CartModel.create({ productId: productId, Qty: Qty ,user:user})
            if (!create) return res.status(500).send({ message: "Somthing went wrong" })
            return res.status(200).send({ message: "Success" })
        } catch (error) {
            console.log(error);
        }
    },
    ListCartItem: async (req, res) => {
        try {
            let {user} =  req.params
            const cartItems = await CartModel.find({user:user});
            const products = await ProductModel.find();
            let matchedProducts = [];
    
            if (!cartItems) return res.status(500).send({ message: "Something went wrong" });
    
            // Loop through each cart item
            cartItems.forEach(cartItem => {
                const productId = cartItem.productId; // Get productId from cart
    
                products.forEach(product => {
                    // Check if product._id matches
                    if (product._id.toString() === productId.toString()) {
                        const item = {
                            name: product.name,
                            Image: product.Image,
                            price: product.price,
                            description: product.Description,
                            Qty: cartItem.Qty,
                            productId: cartItem.productId,
                            _id: cartItem._id
                        };
                        matchedProducts.push(item);
                    } else {
                        // Check if any Variant._id matches
                        const variantMatch = product.Variant.filter(variant => variant._id.toString() === productId.toString());
    
                        // ✅ Fix: Ensure variantMatch[0] exists before accessing properties
                        if (variantMatch.length > 0 && variantMatch[0]) {
                            const item = {
                                name: product.name,
                                Image: variantMatch[0].file || "",  // Use empty string if undefined
                                price: variantMatch[0].price,
                                description: product.Description,
                                Qty: cartItem.Qty,
                                productId: cartItem.productId,
                                color: variantMatch[0].color,
                                size: variantMatch[0].size,
                                _id: cartItem._id
                            };
                            matchedProducts.push(item);
                        }
                    }
                });
            });
    
            return res.status(200).send({ message: "Success", Data: matchedProducts });
    
        } catch (error) {
            console.log("Error in ListCartItem:", error);
            return res.status(500).send({ message: "Internal Server Error" });
        }
    },
    

    RemoveCartItem: async (req, res) => {
        try {
            const { id } = req.params
            const result = await CartModel.findByIdAndDelete({ _id: id })
            if (!result) return res.status(500).send({ message: "somthig went wrong" })
            return res.status(200).send({ mesage: "Success" })
        } catch (error) {
            console.log(error)
        }
    },
    AllCartItemRemove: async (req, res) => {
        try {
            const {id} = req.params
            const result = await CartModel.deleteMany({user:id})
            if (!result) return res.status(500).send({ message: "somthing went wrong" })
            return res.status(200).send({ message: "sucssesc" })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = CartController