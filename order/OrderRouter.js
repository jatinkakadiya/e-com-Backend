const express = require("express")
const OrderController = require("./order.Controller")
let OrderRouter = express.Router()

OrderRouter.post("/create",OrderController.CreateOrder)
OrderRouter.post("/payment/verify",OrderController.PaymentVerify)
OrderRouter.get("/getorderBy/:id",OrderController.getorderByProduct)
OrderRouter.get("/listorder/:id",OrderController.listOrder)
OrderRouter.put("/updatestatus/:OrderId",OrderController.updateStatus)
OrderRouter.put("/orderhistory/:userid",OrderController.Orderhistory)

module.exports = OrderRouter