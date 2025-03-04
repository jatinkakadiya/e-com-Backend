const express = require("express")
const userController = require("./UserController")

let userRouter =express.Router()
userRouter.post("/registore",userController.Register)
userRouter.post("/login",userController.Login)
module.exports = userRouter