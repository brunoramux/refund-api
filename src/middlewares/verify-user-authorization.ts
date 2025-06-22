import { AppError } from "@/utils/AppError";
import { Request, Response, NextFunction } from "express";

// MIDDLEWARE QUE VERIFICA AS AUTORIZAÇÕES DO CLIENTE ATRAVÉS DAS ROLES
// UMA DETERMINADA ROTA PODE SER ACESSAR POR UMA OU MAIS ROLES. A FUNÇÃO VERIFICA SE O USUÁRIO PERTENCE A UMA DESSAS ROLES
function verifyUserAuthorization(role: string[]){
    return (request: Request, response: Response, next: NextFunction) => {
        if(!request.user || !role.includes(request.user.role)){
            throw new AppError("Unauthorized", 401)
        }

        return next()
    }
}

export { verifyUserAuthorization }