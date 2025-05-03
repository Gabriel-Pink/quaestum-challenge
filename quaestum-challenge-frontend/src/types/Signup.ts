import { z } from "zod";

export const signUpSchema = z.object({
    fullName: z.string().min(1, 'Nome completo é obrigatório'),
    email: z.string().email('E-mail inválido'),
    password: z.string().min(6, 'A senha precisa ter pelo menos 6 caracteres'),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'As senhas não coincidem'
})

export type SignUpFormData = z.infer<typeof signUpSchema>