// require multer
const multer = require("multer");

// create storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./Images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

// create file filter
function fileFilter(req, file, cb) {
  if (
    file.mimetype == "jpeg" ||
    file.mimetype == "jpg" ||
    file.mimetype == "png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}


// export multer
module.exports = multer({ storage: storage });
