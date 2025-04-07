import fs from "fs";
import path from "path";
import multer from "multer"
const uploadFolder = path.resolve(__dirname, "..", "..", "..", "files");

export const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder);
    }
    cb(null, uploadFolder);
  },
  filename: (_req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const upload = multer({ storage });
