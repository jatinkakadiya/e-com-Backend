const express = require("express")
const AddressController = require("./Address.Controller")
const AddressRouter = express.Router()

AddressRouter.post("/create",AddressController.addAddress)
AddressRouter.get("/list/:user",AddressController.ListAddress)
AddressRouter.get("/getBy/:id",AddressController.getAddressById)
AddressRouter.delete("/delete/address/:id",AddressController.DeleteAddess)
AddressRouter.put("/update/address/:id",AddressController.UpdateAddress)

module.exports = AddressRouter