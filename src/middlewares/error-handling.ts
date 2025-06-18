import { AppError } from "@/utils/AppError";
import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if(err instanceof AppError){
        res.status(err.statusCode).json({
            message: err.message
        })
        return
    }

    if(err instanceof ZodError) {
        res.status(400).json({
            message: "Validation error",
            issues: err.format()
        });
        return
    }   

    res.status(500).json({
        message: "Internal server error",
        error: err.message || "An unexpected error occurred"
    })
    return
}