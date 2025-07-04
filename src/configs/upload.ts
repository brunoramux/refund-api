import multer from "multer";
import path from "node:path"
import crypto from "node:crypto"

const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp")
const UPLOADS_FOLDER = path.join(TMP_FOLDER, "uploads")

const MAX_FILE_SIZE = 1024 * 1014 * 3
const ACCEPTED_IMAGE_TYPE = ["image/jpeg", "image/jpg", "image/png"]

const MULTER = {
    storage: multer.diskStorage({
        destination: TMP_FOLDER,
        filename(request, file, callback){
            const fileHash = crypto.randomBytes(10).toString("hex")
            const fileName = `${fileHash}-${file.originalname}`

            return callback(null, fileName)
        }
    })
}

export default { TMP_FOLDER, UPLOADS_FOLDER, MAX_FILE_SIZE, ACCEPTED_IMAGE_TYPE, MULTER }