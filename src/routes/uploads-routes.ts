import { UploadsController } from "@/controllers/uploads-controller";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";
import { Router } from "express";

import multer from "multer";
import uploadsConfig from "@/configs/upload"

const uploadsRoutes = Router()
const uploadsController = new UploadsController()

const upload = multer(uploadsConfig.MULTER)

uploadsRoutes.post(
    "/", 
    verifyUserAuthorization(["employee"]),
    upload.single("file"),
    uploadsController.create
)

export { uploadsRoutes };