const CartModel = require("./CartModel");
const ProductModel = require("../Product/ProductModel");

const CartController = {
    AddToCart: async (req, res) => {
        try {
            let { productId, Qty, user } = req.body
            if (!productId || !Qty || !user) return res.status(404).send({ mesage: "Missing dependecy" })
            let result = await CartModel.findOne({ productId: productId, user: user })
            if (result) {
                result = result._doc
                Qty = result.Qty + Qty
                const UPdateProduct = await CartModel.updateOne({ productId: productId, user: user }, { Qty: Qty })
                if (!UPdateProduct || UPdateProduct.modifiedCount <= 0) return res.status(500).send({ mesaage: "Somthing went wrong" })
                return res.status(200).send({ message: "Success" })
            }
            let create = await CartModel.create({ productId: productId, Qty: Qty, user: user })
            if (!create) return res.status(500).send({ message: "Somthing went wrong" })
            return res.status(200).send({ message: "Success" })
        } catch (error) {
            console.log(error);
        }
    },
     ListCartItem: async (req, res) => {
        try {
            let { user } = req.params
            if(!user) return res.status(404).send({message:"missing dependency"})
            const cartItems = await CartModel.find({user:user});
            if (!cartItems || cartItems.length === 0) {
                return res.status(200).send({ message: "Cart is empty", Data: [] });
            }
    
            // Fetch all products
            const products = await ProductModel.find();
            if (!products || products.length === 0) {
                return res.status(500).send({ message: "No products found" });
            }
    
            let matchedProducts = [];
    
            // Loop through each cart item and match with products
            cartItems.forEach(cartItem => {
                const productId = cartItem.productId.toString();
    
                // Find product directly
                const product = products.find(prod => prod._id.toString() === productId);
                if (product) {
                    matchedProducts.push({
                        name: product.name,
                        Image: product.Image,
                        price: product.price,
                        description: product.Description,
                        Qty: cartItem.Qty,
                        productId: cartItem.productId,
                        _id: cartItem._id
                    });
                    return;
                }
    
                // Find matching variant if product was not found
                products.forEach(product => {
                    const variantMatch = product.Variant.find(variant => variant._id.toString() === productId);
                    if (variantMatch) {
                        matchedProducts.push({
                            name: product.name,
                            Image: variantMatch.file || "",  // Handle missing image
                            price: variantMatch.price,
                            description: product.Description,
                            Qty: cartItem.Qty,
                            productId: cartItem.productId,
                            color: variantMatch.color,
                            size: variantMatch.size,
                            _id: cartItem._id
                        });
                    }
                });
            });
    
            return res.status(200).send({ message: "Success", Data: matchedProducts });
    
        } catch (error) {
            console.error("Error in ListCartItem:", error);
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
            const { id } = req.params
            const result = await CartModel.deleteMany({ user: id })
            if (!result) return res.status(500).send({ message: "somthing went wrong" })
            return res.status(200).send({ message: "sucssesc" })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = CartController