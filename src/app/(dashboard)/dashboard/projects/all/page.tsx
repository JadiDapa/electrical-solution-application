import ConnectedCard from "@/components/pages/Dashboard/ConnectedCard";
import DashboardHeader from "@/components/pages/Dashboard/DashboardHeader";
import ProjectTable from "@/components/pages/Dashboard/Projects/ProjectTable";
import { projectColumn } from "@/lib/column/project-column";
import { getAllProjects } from "@/lib/network/project";
import {
  BarChart2,
  Calculator,
  MessagesSquare,
  NotepadText,
  Wrench,
} from "lucide-react";

export default async function ProjectDashboard({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const projects = await getAllProjects();

  const cardData = [
    {
      title: "Total of Projects",
      value: projects?.length,
      Icon: Wrench,
      bgColor: "#add362",
      textColor: "#fff",
    },
    {
      title: "Estimated Projects",
      value: projects?.filter((product) => product.status === "planning")
        .length,
      Icon: Calculator,
      bgColor: "#EDA76D",
      textColor: "#ffffff",
    },
    {
      title: "Offered Projects",
      value: projects?.filter((product) => product.status === "offer").length,
      Icon: NotepadText,
      bgColor: "#ed6d6d",
      textColor: "#ffffff",
    },
    {
      title: "Finished Projects",
      value: projects?.filter((product) => product.status === "finished")
        .length,
      Icon: MessagesSquare,
      bgColor: "#CE6DED",
      textColor: "#ffffff",
    },
  ];

  return (
    <section className="flex w-full flex-col gap-4 lg:gap-6">
      {/* Header Title */}
      <DashboardHeader title="Projects" subtitle="All Projects" />

      {/* Data Statistic */}

      <div className="box-shadow flex flex-col divide-y rounded-md bg-white py-6 lg:flex-row lg:divide-x lg:divide-y-0">
        {cardData.map((list) => (
          <ConnectedCard
            key={list.title}
            title={list.title}
            value={list.value}
            Icon={list.Icon}
            bgColor={list.bgColor}
            textColor={list.textColor}
          />
        ))}
      </div>

      <ProjectTable
        columns={projectColumn}
        data={projects}
        total={projects.length}
      />
    </section>
  );
}
