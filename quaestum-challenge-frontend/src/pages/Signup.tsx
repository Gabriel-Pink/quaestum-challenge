import { SignupForm } from "../components/SignupForm";

export default function Signup() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-3xl bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Cadastrar gestor
        </h1>
        <SignupForm />
        <p className="text-gray-600 text-center mt-4">Já tem uma conta? <a href="/signin" className="text-blue-600">Entrar</a></p>
      </div>
    </div>
  );
}