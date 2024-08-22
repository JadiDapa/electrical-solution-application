"use client";

import ConnectedCard from "@/components/pages/Dashboard/ConnectedCard";
import DashboardHeader from "@/components/pages/Dashboard/DashboardHeader";
import ProjectTable from "@/components/pages/Dashboard/Projects/ProjectTable";
import { projectColumn } from "@/lib/column/project-column";
import { getAllProjects } from "@/lib/network/project";
import { useQuery } from "@tanstack/react-query";
import { Calculator, MessagesSquare, NotepadText, Wrench } from "lucide-react";

export default function ProjectDashboard() {
  const { data: projects } = useQuery({
    queryFn: () => getAllProjects(),
    queryKey: ["projects"],
  });

  const cardData = [
    {
      title: "Total of Projects",
      value: projects?.length || 0,
      Icon: Wrench,
      bgColor: "#add362",
      textColor: "#fff",
    },
    {
      title: "Estimated Projects",
      value:
        projects?.filter((product) => product.status === "planning").length ||
        0,
      Icon: Calculator,
      bgColor: "#EDA76D",
      textColor: "#ffffff",
    },
    {
      title: "Offered Projects",
      value:
        projects?.filter((product) => product.status === "offer").length || 0,
      Icon: NotepadText,
      bgColor: "#ed6d6d",
      textColor: "#ffffff",
    },
    {
      title: "Finished Projects",
      value:
        projects?.filter((product) => product.status === "finished").length ||
        0,
      Icon: MessagesSquare,
      bgColor: "#CE6DED",
      textColor: "#ffffff",
    },
  ];

  if (projects) {
    return (
      <section className="flex w-full flex-col gap-4 lg:gap-6">
        {/* Header Title */}
        <DashboardHeader title="Projects" subtitle="All Projects" />

        {/* Data Statistic */}

        <div className="box-shadow flex flex-col divide-y rounded-md bg-white py-6 lg:flex-row lg:divide-x lg:divide-y-0">
          {cardData?.map((list) => (
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
}
