const express = require("express")
const CartController = require("./CartController")
const CartRouter = express.Router()

CartRouter.post("/addtocart",CartController.AddToCart)
CartRouter.get("/listcart/:user",CartController.ListCartItem)
CartRouter.delete("/removeitem/:id",CartController.RemoveCartItem)
CartRouter.delete("/allitemremove/:id",CartController.AllCartItemRemove)


module.exports = CartRouter