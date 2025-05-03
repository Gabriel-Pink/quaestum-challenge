import { SigninForm } from "../components/SigninForm";

export default function Signin() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-3xl bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Entrar
        </h1>
        <SigninForm />
        <p className="text-gray-600 text-center mt-4">Não tem uma conta? <a href="/signup" className="text-blue-600">Cadastrar</a></p>
        <p className="text-gray-600 text-center mt-4">Se candidatar para <a href="/job-application" className="text-blue-600">Vaga</a></p>
      </div>
    </div>
  );
}