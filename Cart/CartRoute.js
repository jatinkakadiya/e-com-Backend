const express = require("express")
const CartController = require("./CartController")
const CartRouter = express.Router()

CartRouter.post("/addtocart",CartController.AddToCart)
CartRouter.get("/listcart",CartController.ListCartItem)
CartRouter.delete("/removeitem/:id",CartController.RemoveCartItem)
CartRouter.delete("/allitemremove",CartController.AllCartItemRemove)


module.exports = CartRouter