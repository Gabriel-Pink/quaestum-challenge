import { CandidateForm } from "../components/CandidateForm";

export default function JobApplication() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-3xl bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Cadastro de Candidato
        </h1>
        <CandidateForm />
      </div>
    </div>
  );
}