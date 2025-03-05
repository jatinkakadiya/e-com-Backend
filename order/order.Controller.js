let key = {
    key_id: "rzp_test_zGCQXPmnJfWXkO",
    key_secrate: "0hOQhtjk0Vosgys5dExi89wg"
}
const Razorpay = require("razorpay")
const orderModel = require("./Order.model")
const userModel = require("../User/UserModel")
const rozorpay = new Razorpay({ key_id: key.key_id, key_secret: key.key_secrate })

const OrderController = {
    CreateOrder: async (req, res) => {
        try {
            let { user, prodcut, totlePrice, paymentMethod, address, totalDiscount } = req.body
            if (!prodcut || !totlePrice || !paymentMethod || !address || !totalDiscount || !user) return res.status(404).send({ message: "missing dependency" })
            let result = await orderModel.create({ ...req.body })
            if (!result) return res.status(500).send({ message: "Somthing went wrong" })
            result = result._doc
            if (result.paymentMethod === "cod") return res.status(200).send({ message: "Success", data: result })
            let options = {
                amount: totlePrice * 100,
                currency: "INR",
                receipt: result._id,
                payment_capture: 1
            };
            let payment = await rozorpay.orders.create(options)
            if (!payment) res.status(500).send({ message: "Somthing went wrong" })
            let data = {
                ...result,
                razorpayDetails: { ...payment, api_key: key.key_id }
            }
            return res.status(200).send({ message: "Success", data: data })
        } catch (error) {
            console.log(error);
        }
    },
    PaymentVerify: async (req, res) => {
        try {
            let { orderId, razorpay_order_id, razorpay_payment_id } = req.body
            const payment = await rozorpay.payments.fetch(razorpay_payment_id)
            if (!payment) return res.status(500).send({ message: "Somthing went wrong" })
            if ((payment.status === "captured" || payment.status === "created") && razorpay_order_id === payment.order_id) {
                await orderModel.updateOne({ _id: orderId }, { paymentStatus: "success" })
                return res.status(200).send({ message: "Success", paymentStatus: "success" })
            }
            await orderModel.updateOne({ _id: orderId }, { paymentStatus: "reject" })
            return res.status(500).send({ message: "Somthing went wrong" })
        } catch (error) {
            console.log(error);
        }
    },
    getorderByProduct: async (req, res) => {
        try {
            let { id } = req.params
            const result = await orderModel.findOne({ _id: id }).populate("address").populate("user")
            if (!result) return res.status(500).send({ message: "somthing went wrong" })
            return res.status(200).send({ message: "sucssesc", data: result })
        } catch (error) {

            console.log(error);
        }
    },
    listOrder: async (req, res) => {
        try {
            const { id } = req.body
            user = await userModel.findOne({ _id: id })
            if (user.Role === "admin") {
                const result = await orderModel.find()
                if (!result) return res.status(404).send({ message: "somthing went wrong" })
                return res.status(200).send({message:"sucses",result})
            }else{
                return res.status(404).send({message:"user is no accsess"})
            }
        } catch (error) {
            console.log(error);
        }
    }

}


module.exports = OrderController