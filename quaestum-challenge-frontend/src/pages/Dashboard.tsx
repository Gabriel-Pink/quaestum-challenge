import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { ApplicationBox } from "../components/ApplicationBox";
import { api } from "../services/api";
import { InputField } from "../components/form/InputField";
import { Header } from "../components/Header";

type Application = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  zipCode: string;
  birthDate: string;
  educations: any[];
  skills: string[];
  status: string;
};

export function Dashboard() {
  const { dashboard, user } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [nameFilter, setNameFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  const statusTransation: Record<string, string> = {
    pending: "pendente",
    approved: "aprovado",
    refused: "reprovado",
  };

  useEffect(() => {
    dashboard().then((data: any) => {
      const rawApplications = Array.isArray(data.applications)
        ? data.applications
        : data.applications
        ? [data.applications]
        : [];
  
      const enriched = rawApplications.map((app: Application) => ({
        ...app,
        status: statusTransation[app.status] || "pendente",
      }));
  
      setApplications(enriched);
  
      // Mostrar notificação se for candidate e status aprovado
      if (
        data.role === "candidate" &&
        data.applications &&
        data.applications.status === "approved"
      ) {
        setShowNotification(true); // <- Mantém a notificação ativa
      }
    });
  }, []);

  const updateStatus = (id: number, status: string) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status } : app))
    );
  };

  const handleAccept = (id: number) => {
    api.put(`/applications/job-applications/${id}/approve`);
    updateStatus(id, "aprovado");
  };

  const handleReject = (id: number) => {
    api.put(`/applications/job-applications/${id}/decline`);
    updateStatus(id, "reprovado");
  };

  const filteredApplications = applications.filter((app) => {
    const nameMatches = app.name.toLowerCase().includes(nameFilter.toLowerCase());
    const tagMatches =
      tagFilter === ""
        ? true
        : app.skills.some((skill) =>
            skill.toLowerCase().includes(tagFilter.toLowerCase())
          );
    return nameMatches && tagMatches;
  });

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
        {showNotification && (
          <div className="bg-green-500 text-white p-4 rounded-md shadow-md mb-4 max-w-2xl mx-auto text-center">
            Sua candidatura foi <strong>aprovada</strong>! 🎉
            <p>Para os proximos passos, verifique o seu e-mail</p>
          </div>
        )}

        <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">
          {user?.role === "manager" ? "Lista de Candidatos" : "Sua candidatura"}
        </h1>

        {user?.role === "manager" && (
          <div className="p-4 rounded-lg shadow-md bg-white space-y-2 mb-4 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              label="Filtrar por nome"
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
            />
            <InputField
              label="Filtrar por habilidade"
              value={tagFilter}
              onChange={(e) => setTagFilter(e.target.value)}
            />
          </div>
        )}

        <div className="grid gap-6 max-w-4xl mx-auto">
          {filteredApplications.map((app) => (
            <ApplicationBox
              key={app.id}
              application={app}
              role={user?.role || ""}
              onAccept={handleAccept}
              onReject={handleReject}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
