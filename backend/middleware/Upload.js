import multer from "multer";
import path from "path";

// Store files in uploads/resources/
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/resources/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

export default upload;
