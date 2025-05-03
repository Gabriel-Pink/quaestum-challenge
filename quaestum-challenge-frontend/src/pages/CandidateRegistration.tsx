import { CandidatePasswordForm } from "../components/CandidatePasswordForm";
import { useParams } from 'react-router-dom'

export default function CandidateRegistration() {

  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-3xl bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Cadastrar senha
        </h1>
        <CandidatePasswordForm id={id} />
      </div>
    </div>
  );
}