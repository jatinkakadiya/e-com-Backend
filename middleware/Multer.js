const multer = require("multer");

const Store = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './Public')
      },
      filename: function (req, file, cb) {
        
        cb(null, file.originalname)
      }
})

const Uploaded = multer({storage:Store, limits: { fileSize: 10 * 1024 * 1024 }})

module.exports = Uploaded