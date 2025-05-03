import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { InputField } from './form/InputField'
import { SignUpFormData, signUpSchema } from '../types/Signup'
import { useAuth } from '../contexts/AuthContext'
import { useState } from 'react'
import { LoadingPage } from './LoadingPage'

export function SignupForm() {

    const { signUp, isLoading } = useAuth();

    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
    })

    const onSubmit = async (data: SignUpFormData) => {
        try {
            await signUp(data.fullName, data.email, data.password);
            console.log('Usuário cadastrado com sucesso!');
            // Aqui você pode redirecionar ou mostrar uma mensagem de sucesso
        } catch (error: any) {
            setError(error.message);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-md mx-auto">

            {isLoading && <LoadingPage />}

            {error && <p className="text-red-500 text-center">{error}</p>}

            <InputField
                label="Nome Completo"
                type="text"
                {...register('fullName')}
                error={errors.fullName}
            />

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
            <InputField
                label="Confirmar Senha"
                type="password"
                {...register('confirmPassword')}
                error={errors.confirmPassword}
            />

            <div className="text-center">
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
                >
                    Cadastrar
                </button>
            </div>
        </form>
    )
}