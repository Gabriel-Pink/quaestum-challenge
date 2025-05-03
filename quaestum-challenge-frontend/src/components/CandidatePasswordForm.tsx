import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { InputField } from './form/InputField'

import { PasswordFormData, passwordSchema } from '../types/CandidatePassword'
import { useAuth } from '../contexts/AuthContext'

export function CandidatePasswordForm({ id }: { id?: string }) {

  const { resetPassword } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema)
  })

  const onSubmit = (data: PasswordFormData) => {

    try{
      resetPassword(id!, data.password)
    }catch (error) {
      console.error('Erro ao redefinir senha:', error)
    }

  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-md mx-auto">
      <div className="grid gap-4">
        <InputField
          label="Senha"
          type="password"
          {...register('password')}
          error={errors.password}
        />
        <InputField
          label="Confirmar Senha"
          type="password"
          {...register('confirmPassword')}
          error={errors.confirmPassword}
        />
      </div>

      <div className="text-center">
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
        >
          Salvar Senha
        </button>
      </div>
    </form>
  )
}