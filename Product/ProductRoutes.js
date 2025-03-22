const express = require("express")
const ProductController = require("./ProductController")
const Uploaded = require("../middleware/Multer")
const {Auth,RoleAuth} = require("../middleware/Auth")
const produtrouter = express.Router()

produtrouter.post("/create",Uploaded.single("Image"),ProductController.CreateProduct)
produtrouter.get("/list",ProductController.ListProduct)
produtrouter.delete("/delete/:id",ProductController.DeleteProduct)
produtrouter.get("/productsbyid/:id",ProductController.GetproductById)

module.exports =  produtrouter