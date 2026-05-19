import { Briefcase, ChartColumnIncreasing, CircleAlert, LayoutTemplate } from "lucide-react";
import { Card } from "./Card";
import type { Project } from "@/services/projects";
import { useProjects } from "@/hooks/useProjects";

type InfoCardsProps = {
  salesProjectsInProgress: Array<Project>
  oldProjects: number
}

export function InfoCards({salesProjectsInProgress, oldProjects}: InfoCardsProps) {
  const { data, isLoading } = useProjects();

  if (isLoading) return <p>Carregando...</p>;

  const serviceProjectsInProgress = data?.filter((project: Project) => project.serviceStatus === "EM ANDAMENTO") || [];
  const pipelineValue = salesProjectsInProgress.reduce((totalValue: number, project: Project) => {
      return totalValue + Number(project.estimatedValue);
    }, 0);

  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))] gap-4 mb-8">
      <Card>
        <header className="flex justify-between">
          <p className="font-medium text-slate-500">Projetos em aberto</p>
          <Briefcase size={20} className="text-blue-600" />
        </header>
        <main>
          <p className="font-semibold text-2xl">
            {serviceProjectsInProgress?.length}
          </p>
          <span className="text-sm text-slate-500 font-medium">
            Com time arquitetura
          </span>
        </main>
      </Card>
      <Card>
        <header className="flex justify-between">
          <p className="font-medium text-slate-500">OPs em aberto</p>
          <LayoutTemplate size={20} className="text-blue-600" />
        </header>
        <main>
          <p className="font-semibold text-2xl">
            {salesProjectsInProgress?.length}
          </p>
          <span className="text-sm text-slate-500 font-medium">
            Com comercial
          </span>
        </main>
      </Card>
      <Card className="border border-red-300 bg-red-100/30">
        <header className="flex justify-between">
          <p className="font-medium text-red-400">Projetos criticos</p>
          <CircleAlert size={20} className="text-red-400" />
        </header>
        <main>
          <p className="font-semibold text-2xl text-red-500">
            {oldProjects}
          </p>
          <span className="text-sm text-red-400">
            +30 dias sem retorno do comercial
          </span>
        </main>
      </Card>
      <Card>
        <header className="flex justify-between">
          <p className="font-medium text-slate-500">Valor em pipeline</p>
          <ChartColumnIncreasing size={20} className="text-blue-600" />
        </header>
        <main>
          <p className="font-semibold text-2xl">
            {formatter.format(pipelineValue)}
          </p>
          <span className="text-sm text-slate-500 font-medium">
            Estimativa total
          </span>
        </main>
      </Card>
    </div>
  );
}