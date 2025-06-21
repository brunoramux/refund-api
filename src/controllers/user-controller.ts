import { prisma } from '@/database/prisma';
import { AppError } from '@/utils/AppError';
import { UserRole } from '@prisma/client';
import { Request, Response } from 'express';
import z from 'zod';
import { hash } from 'bcrypt';

class UserController {
    async create(request: Request, response: Response){
        const bodySchema = z.object({
            name: z.string().min(1, { message: "Nome é obrigatório" }),
            email: z.string().trim().email({ message: "Email inválido" }).toLowerCase(),
            password: z.string().min(6, { message: "Senha deve ter pelo menos 6 caracteres" }),
            role: z.enum([UserRole.employee, UserRole.manager], { message: "Função inválida" }).default(UserRole.employee)
        });

        const { email, name, password, role } = bodySchema.parse(request.body);

        const userWithSameEmail = await prisma.user.findFirst({
            where: {
                email
            }
        })

        if(userWithSameEmail){
            throw new AppError("E-mail já cadastrado. Faça o Login.")
        }

        const hashedPassword = await hash(password, 8)

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role
            }
        })

        response.status(201).json({
            user
        })
    }
}

export { UserController };