import fs from "fs";
import path from "path";
import multer from "multer"
const tempFolder = path.resolve(__dirname, '..', '..', '..', 'temp')

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    if (!fs.existsSync(tempFolder)) {
     try{
      fs.mkdirSync(tempFolder, { recursive: true })
     }catch(error){
      console.log(error)
     }
    }
    cb(null, tempFolder)
  },
  filename: (_req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`)
  },
})

export const multerService = multer({ storage, limits: {fileSize:10 * 1024 * 1024} })