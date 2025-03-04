const cloudinary = require("cloudinary")
const imgModel = require("./ImageModel")
const fs = require("fs")
cloudinary.config({
    cloud_name: 'dmwiolmq1',
    api_key: '499763469746743',
    api_secret: 'v3mdjJGmy1ls2bu_-A-ebH7zopE'
})

const imageControlle = {
    CreateImage: async (req, res) => {
        try {
            const img = req.file.path
            if (!img) return res.status(404).send({ message: "img is not uplode" })
            const reuslts = await cloudinary.uploader.upload(img)
            const item = await imgModel.create({ img: reuslts.url })
             await fs.unlinkSync(img)
            if (!item) return res.status(404).send({ message: "img is not  created" })
            return res.status(200).send({ message: "sucssece" })

        } catch (error) {
            console.log(error);
        }
    },
    ListImge: async (req, res) => {
        try {
            const result = await imgModel.find()
            if (!result) return res.status(500).send({ message: "somthing went wrong" })
            return res.status(200).send({message:"sucssece",data:result})
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = imageControlle