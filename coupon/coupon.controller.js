const couponModel = require("./coupon.model");
const data =[
    {
        name:"AB12CD34",
        discount:0.2

    },
    {
        name:"X9Y8Z7K6",
        discount:0.4

    },
    {
        name:"Q4W5E6R7",
        discount:0.6

    },
    {
        name:"L0M9B8F5",
        discount:0.1

    },
    {
        name:"N3O2P9V1",
        discount:0.8

    },
]
const couponController = {
    InsartCupon: async (req, res) => {
        try {
            await couponModel.insertMany(data)
            console.log("add");
        } catch (error) {
            console.log(error);
        }
    },
    getcouponList: async (req, res) => {
        try {
            const result = await couponModel.find()
            if (!result) return res.status(500).send({ message: "somthing went Wrong" })
            return res.status(200).send({message:"Succsece",result})
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = couponController