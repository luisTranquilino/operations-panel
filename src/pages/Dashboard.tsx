import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Header } from "../components/Header";
import {
  Briefcase,
  ChartColumnIncreasing,
  CircleAlert,
  LayoutTemplate,
} from "lucide-react";
import { ChartBarDefault } from "@/components/ChartBarDefault";
import { ChartPieDonut } from "@/components/ChartPieDonut";
import { ChartBarHorizontal } from "@/components/ChartBarHorizontal";
import { Card } from "@/components/Card";
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "@/components/data-table/columns";
import { useProjects } from "@/hooks/useProjects";
import type { Project } from "@/services/projects";

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

export function Dashboard() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const { data, isLoading } = useProjects();
  if (isLoading) return <p>Carregando...</p>;

  const serviceProjectsInProgress =
    data &&
    data.filter((project: Project) => project.serviceStatus === "EM ANDAMENTO");

  const salesProjectsInProgress =
    data &&
    data.filter(
      (project: Project) =>
        project.serviceStatus === "CONCLUIDO" && !project.opStatus,
    );

  const salesProjectsFinished =
    data &&
    data.filter(
      (project: Project) =>
        project.serviceStatus === "CONCLUIDO" &&
        project.opStatus === "FATURADA",
    );

  const salesProjectsCanceled =
    data &&
    data.filter(
      (project: Project) =>
        project.serviceStatus === "CONCLUIDO" &&
        project.opStatus === "CANCELADO",
    );

  const pipelineValue =
    salesProjectsInProgress &&
    salesProjectsInProgress.reduce((totalValue: number, project: Project) => {
      return totalValue + Number(project.estimatedValue);
    }, 0);

  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  function excelDateToJSDate(serial: string) {
    const excelStartDate = new Date("1899-12-30");

    excelStartDate.setDate(excelStartDate.getDate() + Number(serial));

    return excelStartDate;
  }

  const limitDate = new Date();

  limitDate.setDate(limitDate.getDate() - 30);

  const oldProjects =
    salesProjectsInProgress &&
    salesProjectsInProgress.filter((project: Project) => {
      const dataProjeto = excelDateToJSDate(project.sentToSalesAt);

      return dataProjeto <= limitDate;
    });

  const projectsCountByAge = salesProjectsInProgress.reduce(
    (projectsAgeList: Array<ProjectCountBy>, project: Project) => {
      const dataProjeto = excelDateToJSDate(project.sentToSalesAt);
      const daysWithoutReturn = Math.ceil(
        (new Date().getTime() - dataProjeto.getTime()) / (1000 * 60 * 60 * 24),
      );

      if (daysWithoutReturn <= 7) {
        projectsAgeList[0].count += 1;
      } else if (daysWithoutReturn <= 14) {
        projectsAgeList[1].count += 1;
      } else if (daysWithoutReturn <= 30) {
        projectsAgeList[2].count += 1;
      } else {
        projectsAgeList[3].count += 1;
      }

      return projectsAgeList;
    },
    [
      { age: "0-7", count: 0, fill: "#2a9d90" },
      { age: "8-14", count: 0, fill: "#e6c564" },
      { age: "15-30", count: 0, fill: "#f3a461" },
      { age: "30+", count: 0, fill: "#f53e5c" },
    ],
  );

  const projectsBySales = salesProjectsInProgress.reduce(
    (groupedProjects: Array<ProjectBySale>, project: Project) => {
      const salesInfo = groupedProjects.find(
        (item) => item.sales === project.sales,
      );
      if (salesInfo) {
        salesInfo.count += 1;
        salesInfo.projects.push(project);
        return groupedProjects;
      }

      groupedProjects.push({
        sales: project.sales,
        count: 1,
        projects: [project],
        fill: "#2463eb",
      });
      return groupedProjects;
    },
    [],
  );

  projectsBySales.sort(
    (a: ProjectBySale, b: ProjectBySale) => b.count - a.count,
  );

  return (
    <>
      <Header userMail={user.email} />
      <main className="bg-gray-100 p-8 flex flex-col gap-12">
        {/* Cards de infos e gráficos */}
        <section>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))] gap-4 mb-8">
            <Card>
              <header className="flex justify-between">
                <p className="font-medium text-slate-500">Projetos em aberto</p>
                <Briefcase size={20} className="text-blue-600" />
              </header>
              <main>
                <p className="font-semibold text-2xl">
                  {serviceProjectsInProgress.length}
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
                  {salesProjectsInProgress.length}
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
                  {oldProjects.length}
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
                      count: salesProjectsInProgress.length,
                      fill: "#2463eb",
                    },
                    {
                      status: "finished",
                      count: salesProjectsFinished.length,
                      fill: "#2d9c8e",
                    },
                    {
                      status: "canceled",
                      count: salesProjectsCanceled.length,
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
        </section>
        <section>
          <div className="mb-6">
            <h2 className="font-medium text-2xl">
              Projetos em Aberto por Responsável
            </h2>
            <span className="text-slate-500 font-medium">
              Monitoramento de pipeline ativo e urgências
            </span>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(500px,100%),1fr))] gap-4">
            {projectsBySales &&
              projectsBySales.map((project: ProjectBySale) => (
                <DataTable
                  columns={columns}
                  data={project.projects}
                  project={project}
                  key={project.sales}
                />
              ))}
          </div>
        </section>
      </main>
    </>
  );
}
