const express = require("express")
const ProductController = require("./ProductController")
const Uploaded = require("../middleware/Multer")
const {Auth,RoleAuth} = require("../middleware/Auth")
const produtrouter = express.Router()

produtrouter.post("/create",Uploaded.single("Image"),Auth,RoleAuth,ProductController.CreateProduct)
produtrouter.get("/list",Auth,ProductController.ListProduct)
produtrouter.delete("/delete/:id",Auth,ProductController.DeleteProduct)
produtrouter.get("/productsbyid/:id",Auth,ProductController.GetproductById)

module.exports =  produtrouter