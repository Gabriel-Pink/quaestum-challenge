import { z } from 'zod'

export const candidateSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  birthDate: z.string().min(1, 'Data de nascimento é obrigatória'),
  email: z.string().email('E-mail inválido'),
  phone: z.string().min(1, 'Telefone é obrigatório'),
  cep: z.string().min(8, 'CEP inválido'),
  address: z.string().min(1, 'Endereço é obrigatório'),
  skills: z.array(z.string()).nonempty('Selecione pelo menos uma habilidade'),
  educations: z.array(
    z.object({
      courseName: z.string().min(1, 'Nome do curso é obrigatório'),
      institution: z.string().min(1, 'Nome da instituição é obrigatório'),
      graduationDate: z.string().min(1, 'Data de conclusão é obrigatória'),
    })
  ),
});

export type CandidateFormData = z.infer<typeof candidateSchema>;
