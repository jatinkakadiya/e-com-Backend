const express = require("express")
const VariantController = require("./variant.Controlle")

let variantrouter = express.Router()

variantrouter.get("/value",VariantController.Getvariant)

module.exports = variantrouter