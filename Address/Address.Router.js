const express = require("express")
const AddressController = require("./Address.Controller")
const AddressRouter = express.Router()

AddressRouter.post("/create",AddressController.addAddress)
AddressRouter.get("/list/:user",AddressController.ListAddress)
AddressRouter.get("/getBy/:id",AddressController.getAddressById)

module.exports = AddressRouter