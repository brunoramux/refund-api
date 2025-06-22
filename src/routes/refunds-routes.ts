
import { RefundsController } from "@/controllers/refunds-controller";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";
import { Router } from "express";

const refundsRoutes = Router()

const refundsController = new RefundsController()

refundsRoutes.post(
    "/", 
    // MIDDLEWARE QUE VERIFICAR SE O USUARIO LOGADO ESTÁ NAS ROLES AUTORIZADAS POR ESSA ROTA
    verifyUserAuthorization(["employee"]),
    refundsController.create
)

export { refundsRoutes };