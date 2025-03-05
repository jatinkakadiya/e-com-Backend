const expres = require("express")
const ConnectDb = require("./config/DataBase")
const produtrouter = require("./Product/ProductRoutes")
const CartRouter = require("./Cart/CartRoute")
const cors = require("cors")
const ProductController = require("./Product/ProductController")
const VariantController = require("./Variant/variant.Controlle")
const variantrouter = require("./Variant/variant.router")
const imgRouter = require("./image/ImageRouter")
const couponController = require("./coupon/coupon.controller")
const couponRouter = require("./coupon/coupon.router")
const AddressRouter = require("./Address/Address.Router")
const OrderRouter = require("./order/OrderRouter")
const userRouter = require("./User/UserRouter")
let cookieParser = require('cookie-parser')
require("dotenv").config()
const app = expres()
app.use(expres.json())
app.use(cookieParser());
const blockedOrigins = ['http://localhost:5173', 'http://localhost:3000'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || !blockedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('This origin is not allowed by CORS'));
    }
  }
}));

ConnectDb()
// ProductController.Insartmany()
app.use("/product",produtrouter)
app.use("/cart",CartRouter)
app.use("/Variants",variantrouter)
app.use("/img",imgRouter)
app.use("/coupon",couponRouter)
app.use("/address",AddressRouter)
app.use("/order",OrderRouter)
app.use("/user",userRouter)
// VariantController.InsatMany()
const port = process.env.PORT || 8888; // Use the port provided by Render
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
