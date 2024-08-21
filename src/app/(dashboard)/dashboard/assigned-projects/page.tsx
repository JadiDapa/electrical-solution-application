import ConnectedCard from "@/components/pages/Dashboard/ConnectedCard";
import DashboardHeader from "@/components/pages/Dashboard/DashboardHeader";
import ProjectTable from "@/components/pages/Dashboard/Projects/ProjectTable";
import { auth } from "@/lib/auth";
import { projectColumn } from "@/lib/column/project-column";
import { getAllProjects } from "@/lib/network/project";
import { getUserByEmail, getUserById } from "@/lib/network/user";
import {
  BarChart2,
  Calculator,
  MessagesSquare,
  NotepadText,
  Wrench,
} from "lucide-react";

export default async function AssignedProjectDashboard({
  params,
}: {
  params: { [key: string]: string | undefined };
}) {
  const session = await auth();
  const userId = session?.user.id;
  const projects = await getAllProjects();
  const handledProjects = projects.filter(
    (project) => project.unit_handler === userId,
  );

  const cardData = [
    {
      title: "Total of Projects",
      value: handledProjects?.length,
      Icon: Wrench,
      bgColor: "#add362",
      textColor: "#fff",
    },
    {
      title: "Estimated Projects",
      value: handledProjects?.filter((product) => product.status === "planning")
        .length,
      Icon: Calculator,
      bgColor: "#EDA76D",
      textColor: "#ffffff",
    },
    {
      title: "Offered Projects",
      value: handledProjects?.filter((product) => product.status === "offer")
        .length,
      Icon: NotepadText,
      bgColor: "#ed6d6d",
      textColor: "#ffffff",
    },
    {
      title: "Finished Projects",
      value: handledProjects?.filter((product) => product.status === "finished")
        .length,
      Icon: MessagesSquare,
      bgColor: "#CE6DED",
      textColor: "#ffffff",
    },
  ];

  return (
    <section className="flex w-full flex-col gap-4 lg:gap-6">
      {/* Header Title */}
      <DashboardHeader
        title="Projects assigned to your unit to handle"
        subtitle="Assigned Projects"
      />

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
        data={handledProjects}
        total={projects.length}
        title="Assigned"
      />
    </section>
  );
}
