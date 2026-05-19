import type { Project } from "@/services/projects";
import type { ColumnDef } from "@tanstack/react-table";
import { CircleAlert, CircleCheck, Clock, TriangleAlert } from "lucide-react";

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "projectDescription",
    header: "Projeto",
    cell: ({ row }) => {
      const description: string = row.getValue("projectDescription");
      return <div className="max-w-50 truncate font-medium">{description}</div>;
    },
  },
  {
    accessorKey: "client",
    header: "Cliente",
  },
  {
    accessorKey: "estimatedValue",
    header: () => <div className="text-right">Valor Estimado</div>,
    cell: ({ row }) => {
      const estimatedValue = parseFloat(row.getValue("estimatedValue"));
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(estimatedValue);

      return <div className="text-right text-slate-500">{formatted}</div>;
    },
  },
  {
    accessorKey: "sentToSalesAt",
    header: () => <div className="text-right">Último Status</div>,
    cell: ({ row }) => {
      const sentToSalesAt = row.getValue("sentToSalesAt");
      const projectDate = new Date(String(sentToSalesAt));
      const daysWithoutReturn = Math.ceil(
        (new Date().getTime() - projectDate.getTime()) / (1000 * 60 * 60 * 24),
      );

      function DateFlag() {
        if (daysWithoutReturn <= 7) {
          return (
            <span className="bg-green-100 border border-green-400 px-2 py-1 rounded-lg text-xs font-medium text-green-700">
              <CircleCheck className="inline-block w-4 h-4 mr-1" />
              {daysWithoutReturn} dias
            </span>
          );
        } else if (daysWithoutReturn <= 14) {
          return (
            <span className="bg-yellow-100 border border-yellow-400 px-2 py-1 rounded-lg text-xs font-medium text-yellow-700">
              <Clock className="inline-block w-4 h-4 mr-1" />
              {daysWithoutReturn} dias
            </span>
          );
        } else if (daysWithoutReturn <= 30) {
          return (
            <span className="bg-orange-100 border border-orange-400 px-2 py-1 rounded-lg text-xs font-medium text-orange-700">
              <TriangleAlert className="inline-block w-4 h-4 mr-1" />
              {daysWithoutReturn} dias
            </span>
          );
        } else {
          return (
            <span className="bg-red-100 border border-red-400 px-2 py-1 rounded-lg text-xs font-medium text-red-700">
              <CircleAlert className="inline-block w-4 h-4 mr-1" />
              {daysWithoutReturn} dias
            </span>
          );
        }
      }

      return (
        <div className="flex justify-end">
          <DateFlag />
        </div>
      );
    },
  },
];
