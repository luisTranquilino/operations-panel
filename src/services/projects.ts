// import { api } from "@/services/api";
import { supabase } from "@/lib/supabase";

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
  // const response = await api.get("/");
  // return response.data;

   const { data, error } = await supabase
    .from("operations-data")
    .select("*");

  if (error) {
    throw error;
  }

  return data;
}
