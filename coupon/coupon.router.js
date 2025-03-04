const express = require("express")
const couponController = require("./coupon.controller")
const couponRouter = express.Router()

couponRouter.get("/list",couponController.getcouponList)

module.exports = couponRouter