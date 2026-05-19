import type { Project } from "@/services/projects";
import { Card } from "./Card";
import { ChartBarDefault } from "./ChartBarDefault";
import { ChartBarHorizontal } from "./ChartBarHorizontal";
import { ChartPieDonut } from "./ChartPieDonut";
import { useProjects } from "@/hooks/useProjects";

type ProjectCountBy = {
  age: string;
  count: number;
  fill: string;
};

type ProjectBySale = {
  sales: string;
  count: number;
  projects: Array<Project>;
  fill: string;
};

type InfoChartsProps = {
  salesProjectsInProgress: Array<Project>
  projectsCountByAge: Array<ProjectCountBy>
  projectsBySales: Array<ProjectBySale>
}

export function InfoCharts ({projectsCountByAge, salesProjectsInProgress, projectsBySales}: InfoChartsProps) {
  const { data, isLoading } = useProjects();
  if (isLoading) return <p>Carregando...</p>;

  const salesProjectsFinished = data?.filter((project: Project) => project.serviceStatus === "CONCLUIDO" && project.opStatus === "FATURADA") || [];
  const salesProjectsCanceled = data?.filter((project: Project) => project.serviceStatus === "CONCLUIDO" && project.opStatus === "CANCELADO") || [];
  
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-4">
      <Card className="col-span-2 ">
        <header>
          <p className="font-medium">Pipeline por responsável</p>
        </header>
        <main>
          <ChartBarDefault projectsBySales={projectsBySales} />
        </main>
      </Card>
      <Card className="flex flex-col justify-center">
        <header>
          <p className="font-medium">Status de Faturamento</p>
        </header>
        <main className="my-auto">
          <ChartPieDonut
            salesProjectsStatus={[
              {
                status: "progress",
                count: salesProjectsInProgress?.length || 0,
                fill: "#2463eb",
              },
              {
                status: "finished",
                count: salesProjectsFinished?.length || 0,
                fill: "#2d9c8e",
              },
              {
                status: "canceled",
                count: salesProjectsCanceled?.length || 0,
                fill: "#ee4059",
              },
            ]}
          />
        </main>
      </Card>
      <Card className="flex flex-col justify-center">
        <header>
          <p className="font-medium">Aging: Dias sem Retorno</p>
        </header>
        <main className="my-auto">
          <ChartBarHorizontal projectsCountByAge={projectsCountByAge} />
        </main>
      </Card>
    </div>
  );
}