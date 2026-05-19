import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Header } from "../components/Header";
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "@/components/data-table/columns";
import { useProjects } from "@/hooks/useProjects";
import type { Project } from "@/services/projects";
import { InfoCards } from "@/components/InfoCards";
import { InfoCharts } from "@/components/InfoCharts";

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

  const salesProjectsInProgress = data?.filter((project: Project) => project.serviceStatus === "CONCLUIDO" && !project.opStatus) || [];

  const limitDate = new Date();

  limitDate.setDate(limitDate.getDate() - 30);

  const projectsCountByAge = salesProjectsInProgress?.reduce(
    (projectsAgeList: Array<ProjectCountBy>, project: Project) => {
      const projectDate = new Date(project.sentToSalesAt);
      const daysWithoutReturn = Math.ceil(
        (new Date().getTime() - projectDate.getTime()) / (1000 * 60 * 60 * 24),
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

  const projectsBySales = salesProjectsInProgress?.reduce(
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
        <section>
          <InfoCards salesProjectsInProgress={salesProjectsInProgress} oldProjects={projectsCountByAge[3].count} />
          <InfoCharts salesProjectsInProgress={salesProjectsInProgress} projectsCountByAge={projectsCountByAge} projectsBySales={projectsBySales} />
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
