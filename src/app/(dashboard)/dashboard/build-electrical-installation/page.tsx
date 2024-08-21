import ConnectedCard from "@/components/pages/Dashboard/ConnectedCard";
import DashboardHeader from "@/components/pages/Dashboard/DashboardHeader";
import ProjectTable from "@/components/pages/Dashboard/Projects/ProjectTable";
import { auth } from "@/lib/auth";
import { userProjectcolumn } from "@/lib/column/user-project-column";
import { getProjectsByUserId } from "@/lib/network/project";
import {
  BarChart2,
  Calculator,
  MessagesSquare,
  NotepadText,
  Wrench,
} from "lucide-react";

export default async function BuildElectricalInstallationDashboard() {
  const session = await auth();
  const userId = session?.user.id;
  const projects = await getProjectsByUserId(userId || "");
  const BEIProjects = projects.filter(
    (project) => project.type === "build-electrical-installation",
  );

  const cardData = [
    {
      title: "Total of Projects",
      value: BEIProjects?.length,
      Icon: Wrench,
      bgColor: "#add362",
      textColor: "#fff",
    },
    {
      title: "Estimated Projects",
      value: BEIProjects?.filter((product) => product.status === "planning")
        .length,
      Icon: Calculator,
      bgColor: "#EDA76D",
      textColor: "#ffffff",
    },
    {
      title: "Offered Projects",
      value: BEIProjects?.filter((product) => product.status === "offer")
        .length,
      Icon: NotepadText,
      bgColor: "#ed6d6d",
      textColor: "#ffffff",
    },
    {
      title: "Finished Projects",
      value: BEIProjects?.filter((product) => product.status === "finished")
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
        title="Your Projects"
        subtitle="Build Electrical Installation"
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
        columns={userProjectcolumn}
        data={BEIProjects}
        total={projects.length}
        title="Your Build Electrical Installations"
      />
    </section>
  );
}
