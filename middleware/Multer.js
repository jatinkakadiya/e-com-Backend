const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure the 'Public' directory exists
const publicDir = path.join(__dirname, '../Public');
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
}

// Configure Multer storage
const Store = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, publicDir); // Save files to the 'Public' directory
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // Unique filename
        const ext = path.extname(file.originalname); // Get file extension
        cb(null, file.fieldname + '-' + uniqueSuffix + ext); // Save with unique name
    }
});

// Configure Multer upload middleware
const Uploaded = multer({ 
    storage: Store,
    limits: { fileSize: 5 * 1024 * 1024 } // Limit file size to 5MB
});

module.exports = Uploaded;