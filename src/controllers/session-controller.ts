import { prisma } from "@/database/prisma"
import { AppError } from "@/utils/AppError"
import { Request, Response } from "express"
import z from "zod"
import { compare } from "bcrypt"
import { authConfig } from "@/configs/auth"
import { sign } from "jsonwebtoken"

class SessionController {
    async create(request: Request, response: Response){
        const bodySchema = z.object({
            email: z.string().email({message: "E-mail inválido."}),
            password: z.string()
        })

        const { email, password} = bodySchema.parse(request.body)

        const user = await prisma.user.findFirst({
            where: {
                email
            }
        })

        if(!user){
            throw new AppError("E-mail ou senha inválidos.", 401)
        }

        const passwordMatched = await compare(password, user.password)

        if(!passwordMatched){
            throw new AppError("E-mail ou senha inválidos.", 401)
        }

        const { secret, expiresIn } = authConfig.jwt

        const token = sign({ role: user.role}, secret, {
            subject: user.id,
            expiresIn
        })

        const { password: _, ...userWithoutPassword } = user

        response.status(200).json({
            token,
            user: userWithoutPassword
        })
    }
}

export { SessionController }