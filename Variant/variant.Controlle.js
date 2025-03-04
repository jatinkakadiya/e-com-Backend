const variant = require("./Variant.Model");
const dummyVariantData = {
    color: ["Red", "Blue", "Green", "Black", "White", "Yellow", "Pink", "Purple", "Orange", "Brown"],
    Size: ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL", "6XL"]
};
const VariantController = {
    InsatMany: async (req, res) => {
        try {
            await variant.insertMany(dummyVariantData)
            console.log("Dummy data inserted successfully!");
        } catch (error) {
            console.log(error);
        }
    },
    Getvariant:async (req,res) =>{
        try {
            const result  = await variant.find()
            if(!result)  return res.status(500).send({message:"somthing went  wrong"})
                return res.status(200).send({message:"succsec",data:result})
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = VariantController