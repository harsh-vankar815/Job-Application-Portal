const multer = require("multer");
const path = require("path");
const fs = require("fs");

// checking the uploads/ directory exists or not
const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "=" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  // accepts of that resume which have .pdf, .doc, .docs extension
  const allowedExtensions = [".pdf", ".doc", ".docx"];
  const ext = path.extname(file.originalname).toLowerCase(); // file extension

  if (allowedExtensions.includes(ext)) {
    cb(null, true); // file is allowed
  } else {
    cb(new Error("Only .PDF, .DOC, and .DOCX files are allowed"), false); // file not allowed rejected
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
