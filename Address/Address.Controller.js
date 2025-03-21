const addressModel = require("./Address.Model");

const AddressController = {
    addAddress: async (req, res) => {
        try {
            const { FristName, LastName, Phone, City, State, AddressName, Pincode, user } = req.body
            if (!FristName || !LastName || !Phone || !City || !State || !AddressName || !Pincode || !user) return res.status(404).send({ message: "missing dependecy" })
            const result = await addressModel.create({ ...req.body })
            if (!result) return res.status(500).send({ message: "somthing went wrong" })
            return res.status(200).send({ message: "susccsess" })

        } catch (error) {
            console.log(error);
        }
    },
    ListAddress: async (req, res) => {
        try {
            let { user } = req.params
            const result = await addressModel.find({ user })
            if (!result) return res.status(500).send({ message: "somthing went wrong" })
            return res.status(200).send({ message: "sucsess", data: result })
        } catch (error) {
            console.log(error);
        }
    },
    getAddressById: async (req, res) => {
        try {
            let { id } = req.params
            const result = await addressModel.findById(id)
            if (!result) return res.status(500).send({ message: "somthing went wrong" })
            return res.status(200).send({ message: "sucsess", data: result })
        } catch (error) {
            console.log(error);
        }
    },
    DeleteAddess: async (req, res) => {
        try {
            const { id } = req.params
            if (!id) return res.status(404).send({ nmessage: "missing dependency" })
            let result = await addressModel.findByIdAndDelete({ _id: id })
            if (!result) return res.status(500).send({ message: "somthing went wrong" })
            return res.status(200).send({ message: "sucsess" })
        } catch (error) {
            console.log(error);
        }
    },
    UpdateAddress:async(req,res)=>{
        try {
            let  {id} = req.params
            let result = await addressModel.findByIdAndUpdate({_id:id},{...req.body})
            if (!result) return res.status(500).send({ message: "somthing went wrong" })
                return res.status(200).send({ message: "sucsess" })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = AddressController

