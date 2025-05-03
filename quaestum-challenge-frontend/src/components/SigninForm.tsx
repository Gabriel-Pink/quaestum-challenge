import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { InputField } from './form/InputField'
import { SignInFormData, signInSchema } from '../types/Signin'
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import { LoadingPage } from './LoadingPage';

export function SigninForm() {

  const { signIn, isLoading } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  })

  const onSubmit = async (data: SignInFormData) => {
    
    try { 
      await signIn(data.email, data.password);

    }catch (error: any) {
      setError(error.message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-md mx-auto">

      {isLoading && <LoadingPage />}

      {/* Exibe mensagem de erro se houver */}

      {error && <p className="text-red-500 text-center">{error}</p>}

      <InputField
        label="E-mail"
        type="email"
        {...register('email')}
        error={errors.email}
      />

      <InputField
        label="Senha"
        type="password"
        {...register('password')}
        error={errors.password}
      />

      <div className="text-center">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Entrar
        </button>
      </div>
    </form>
  )
}