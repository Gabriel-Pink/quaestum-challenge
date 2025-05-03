import { useState } from "react";

interface Education {
    courseName: string;
    graduationDate: string;
    institutionName: string;
}

interface Application {
    id: number;
    name: string;
    birthDate: string;
    email: string;
    phone: string;
    address: string;
    zipCode: string;
    educations: Education[];
    skills: string[];
    status?: any;
}

interface Props {
    application: Application;
    role: string;
    onAccept: (id: number) => void;
    onReject: (id: number) => void;
}
  

export function ApplicationBox({ application, role, onAccept, onReject }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(prev => !prev);

  return (
    <div className="p-4 rounded-lg shadow-md bg-white space-y-2 mb-4">
      <div className="flex justify-between items-center">
        <div>
          <div className="text-xl font-semibold">{application.name}</div>
          <div className="text-sm text-gray-500">{application.email}</div>
        </div>
        <div className="text-sm font-medium px-3 py-1 rounded-full bg-blue-100 text-blue-700 capitalize">
          {application.status}
        </div>
      </div>

      <button
        onClick={toggleExpand}
        className="text-sm text-blue-600 underline hover:text-blue-800"
      >
        {isExpanded ? "Recolher detalhes" : "Ver mais detalhes"}
      </button>

      {isExpanded && (
        <div className="space-y-2">
          <div><strong>Telefone:</strong> {application.phone}</div>
          <div><strong>Endereço:</strong> {application.address}</div>
          <div><strong>CEP:</strong> {application.zipCode}</div>
          <div><strong>Data de Nascimento:</strong> {application.birthDate}</div>

          <div>
            <strong>Formações:</strong>
            {application.educations.length === 0 ? (
              <div className="text-gray-500">Nenhuma formação cadastrada.</div>
            ) : (
              <ul className="list-disc ml-5">
                {application.educations.map((edu, idx) => (
                  <li key={idx}>
                    {edu.courseName} – {edu.institutionName} (
                    {new Date(edu.graduationDate).toLocaleDateString()})
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <strong>Skills:</strong>{" "}
            {application.skills.length ? application.skills.join(", ") : "Nenhuma skill"}
          </div>
        </div>
      )}

      {role === "manager" && (
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => onReject(application.id)}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Recusar
          </button>
          <button
            onClick={() => onAccept(application.id)}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Aceitar
          </button>
        </div>
      )}
    </div>
  );
}
