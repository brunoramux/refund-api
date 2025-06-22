import { Request, Response } from "express";

class UploadsController {
    async create(request: Request, response: Response){
        response.status(200).json({
            message: "Ok"
        })
    }
}

export { UploadsController }