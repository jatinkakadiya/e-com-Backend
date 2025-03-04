const express = require("express")
const OrderController = require("./order.Controller")
let OrderRouter = express.Router()

OrderRouter.post("/create",OrderController.CreateOrder)
OrderRouter.post("/payment/verify",OrderController.PaymentVerify)
OrderRouter.get("/getorderBy/:id",OrderController.getorderByProduct)

module.exports = OrderRouter