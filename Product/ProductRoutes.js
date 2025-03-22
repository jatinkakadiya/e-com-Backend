const express = require("express")
const ProductController = require("./ProductController")
const {Auth,RoleAuth} = require("../middleware/Auth")
const upload = require("../middleware/Multer")
const produtrouter = express.Router()

produtrouter.post("/create",upload.single("Image"),ProductController.CreateProduct)
produtrouter.get("/list",ProductController.ListProduct)
produtrouter.delete("/delete/:id",ProductController.DeleteProduct)
produtrouter.get("/productsbyid/:id",ProductController.GetproductById)

module.exports =  produtrouter