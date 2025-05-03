import { z } from 'zod'


// Esquema de validação com zod
export const passwordSchema = z.object({
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'As senhas não coincidem'
})

export type PasswordFormData = z.infer<typeof passwordSchema>