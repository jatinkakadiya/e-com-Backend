const express = require("express")
const OrderController = require("./order.Controller")
let OrderRouter = express.Router()

OrderRouter.post("/create",OrderController.CreateOrder)
OrderRouter.post("/payment/verify",OrderController.PaymentVerify)
OrderRouter.get("/getorderBy/:id",OrderController.getorderByProduct)
OrderRouter.get("/listorder/:id",OrderController.listOrder)
OrderRouter.put("/updatestatus/:id",OrderController.updateStatus)
OrderRouter.put("/orderhistory/:id",OrderController.Orderhistory)

module.exports = OrderRouter