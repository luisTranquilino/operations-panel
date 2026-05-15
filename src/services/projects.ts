import { api } from "@/services/api";

export interface Project {
  id: string;
  client: string;
  projectDescription: string;
  sales: string;
  serviceStatus: "CONCLUIDO" | "EM ANDAMENTO" | "CANCELADO";
  sentToSalesAt: string;
  estimatedValue: string;
  opStatus: "CANCELADO" | "FATURADA" | null;
  opDate: string;
  negotiatedValue: string | null;
}

export async function getProjects() {
  const response = await api.post("", {});
  return response.data;
}
