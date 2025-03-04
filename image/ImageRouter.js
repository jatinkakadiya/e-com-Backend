const express = require("express")
const Uploaded = require("../middleware/Multer")
const imageControlle = require("./ImageController")

const imgRouter =express.Router()

imgRouter.post("/create",Uploaded.single("image"),imageControlle.CreateImage)
imgRouter.get("/list",imageControlle.ListImge)


module.exports = imgRouter